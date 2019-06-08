import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import fs from 'fs-extra';
import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';
import path from 'path';
import slug from 'slug';
import crypto from 'crypto';

import { signToken } from './auth';
import recipeModel, { Recipe } from '../models/recipe';
import userModel, { User } from '../models/user';

type Context = {
  user?: User;
};

type RecipeInput = {
  title: string;
  slug: string;
  directions?: string;
  sideDish?: string;
  preparationTime?: number;
  servingCount?: number;
  ingredients: IngredientInput[];
};

type IngredientInput = {
  name: string;
  amount?: number;
  amountUnit?: string;
  isGroup: boolean;
};

type FileUpload = {
  createReadStream: () => NodeJS.ReadableStream;
  filename: string;
  mimetype: string;
  encoding: string;
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Recipe {
    _id: ID!
    title: String!
    slug: String!
    directions: String
    sideDish: String
    preparationTime: Int
    servingCount: Int
    user: User!
    hasImage: Boolean
    lastModifiedDate: Date!
    ingredients: [Ingredient!]!
  }

  type Ingredient {
    _id: ID!
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean
  }

  type AuthPayload {
    token: String
  }

  type User {
    _id: ID!
    username: String!
    displayName: String!
    isAdmin: Boolean
    lastActivity: Date
  }

  input RecipeInput {
    title: String!
    directions: String
    sideDish: String
    preparationTime: Int
    servingCount: Int
    ingredients: [IngredientInput!]!
    image: Upload
  }

  input IngredientInput {
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID, slug: String): Recipe
    ingredients: [String!]!
    sideDishes: [String!]!
    me: User
  }

  type Mutation {
    login(username: String!, password: String): AuthPayload
    createRecipe(recipe: RecipeInput!, image: Upload): Recipe
    updateRecipe(id: ID!, recipe: RecipeInput!, image: Upload): Recipe
    deleteRecipe(id: ID!): Boolean
    updateUserLastActivity: Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    recipes: async () =>
      (await recipeModel.find({}).populate('user')).sort((a, b) =>
        a.title.localeCompare(b.title, 'cs'),
      ),
    recipe: async (_, args: { id?: string; slug?: string }) => {
      if (!args.id && !args.slug) {
        return null;
      }

      if (args.id) {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          return null;
        }

        return await recipeModel.findById(args.id).populate('user');
      }

      if (args.slug) {
        return await recipeModel.findOne({ slug: args.slug }).populate('user');
      }
    },
    ingredients: async () => {
      const ingredients: string[] = await recipeModel.distinct('ingredients.name');
      return ingredients.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
    },
    sideDishes: async () => {
      const sideDishes: string[] = await recipeModel.distinct('sideDish');
      return sideDishes.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
    },
    me: async (_, _args, context) => {
      if (!context.user) {
        return null;
      }

      return context.user;
    },
  },
  Mutation: {
    login: async (_, args: { username: string; password: string }) => {
      const user = await userModel.findOne({ username: args.username });

      return {
        token:
          user && sha512(args.password, user.salt) === user.password ? signToken(user.id) : null,
      };
    },
    createRecipe: async (
      _,
      args: { recipe: RecipeInput; image?: Promise<FileUpload> },
      context: Context,
    ) => {
      if (!context.user) {
        return null;
      }

      const recipeToSave = await prepareRecipe(args.recipe, args.image, context.user);
      return await recipeModel.create(recipeToSave);
    },
    updateRecipe: async (
      _,
      args: { id: string; recipe: RecipeInput; image?: Promise<FileUpload> },
      context: Context,
    ) => {
      if (!context.user || !(await checkUserRightsAsync(context.user, args.id))) {
        return null;
      }

      const recipeToSave = await prepareRecipe(args.recipe, args.image);
      const recipe = await recipeModel
        .findByIdAndUpdate(args.id, { $set: recipeToSave }, { new: true })
        .populate('user');

      return recipe;
    },
    deleteRecipe: async (_, args: { id: string }, context: Context) => {
      if (!context.user || !(await checkUserRightsAsync(context.user, args.id))) {
        return false;
      }

      const recipe = await recipeModel.findByIdAndRemove(args.id);

      if (!recipe) {
        return false;
      }

      const thumbPath = getThumbPath(recipe.slug);
      fs.remove(thumbPath).catch(console.log);

      return true;
    },
    updateUserLastActivity: async (_context, _args, context: Context) => {
      if (!context.user) {
        return false;
      }

      userModel.findByIdAndUpdate(context.user._id, { lastActivity: new Date() });

      return true;
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

async function prepareRecipe(
  recipe: RecipeInput,
  fileUpload?: Promise<FileUpload>,
  user?: User,
): Promise<Partial<Recipe>> {
  const slug = toSlug(recipe.title);
  let newRecipe: Partial<Recipe> = {
    ...recipe,
    title: recipe.title.trim(),
    slug,
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    preparationTime: recipe.preparationTime || undefined,
    servingCount: recipe.servingCount || undefined,
    directions: recipe.directions || undefined,
    ingredients: recipe.ingredients
      ? recipe.ingredients.map(ingredient => ({
          ...ingredient,
          name: ingredient.name.trim(),
        }))
      : [],
    lastModifiedDate: new Date(),
  };

  if (fileUpload) {
    const stream = (await fileUpload).createReadStream();
    const bufs: Buffer[] = [];
    const image = await new Promise<Buffer>(resolve => {
      stream
        .on('data', (data: Buffer) => {
          bufs.push(data);
        })
        .on('end', () => {
          resolve(Buffer.concat(bufs));
        });
    });

    newRecipe = {
      ...newRecipe,
      image,
      hasImage: true,
    };

    const thumbPath = getThumbPath(slug);
    await fs.remove(thumbPath);
  }

  if (user) {
    newRecipe = {
      ...newRecipe,
      user,
    };
  }

  return newRecipe;
}

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}

async function checkUserRightsAsync(user: User | null, recipeId: string) {
  const recipe = await recipeModel.findById(recipeId);

  return Boolean(user && recipe && (user.isAdmin || recipe.user === user._id));
}

export function getThumbPath(slug: string): string {
  return path.join(`/tmp/cookbook/thumbs/${slug}.jpg`);
}

function genRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function sha512(password: string, salt: string) {
  var sha512 = crypto.createHmac('sha512', salt);
  sha512.update(password);

  return sha512.digest('hex');
}

export function saltHashPassword(password: string) {
  const salt = genRandomString(16);

  return {
    hash: sha512(password, salt),
    salt,
  };
}

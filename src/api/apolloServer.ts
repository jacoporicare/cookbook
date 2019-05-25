import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import fs from 'fs-extra';
import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';
import path from 'path';
import slug from 'slug';

import { checkUser, findUserById, signToken, superAdminIds } from '../auth.service';
import recipeModel, { Recipe } from './recipe/model';
import { User } from '../types';

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
    userId: Int!
    userName: String!
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
    id: Int!
    username: String!
    name: String!
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
  }
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    recipes: async () =>
      (await recipeModel.find({}))
        .map(r => r.toObject())
        .map(appendUserName)
        .sort((a, b) => a.title.localeCompare(b.title, 'cs')),
    recipe: async (_, args: { id?: string; slug?: string }) => {
      if (!args.id && !args.slug) {
        return null;
      }

      if (args.id) {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          return null;
        }

        const recipe = await recipeModel.findById(args.id);
        return recipe && appendUserName(recipe.toObject());
      }

      if (args.slug) {
        const recipe = await recipeModel.findOne({ slug: args.slug });
        return recipe && appendUserName(recipe.toObject());
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
      const user = checkUser(args.username, args.password);

      return {
        token: user ? signToken(user.id) : null,
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

      const recipeToSave = await prepareRecipe(args.recipe, args.image, context.user.id);
      const recipeDocument = await recipeModel.create(recipeToSave);

      return appendUserName(recipeDocument.toObject());
    },
    updateRecipe: async (
      _,
      args: { id: string; recipe: RecipeInput; image?: Promise<FileUpload> },
      context: Context,
    ) => {
      if (!context.user || !(await checkUserRightsAsync(context.user.id, args.id))) {
        return null;
      }

      const recipeToSave = await prepareRecipe(args.recipe, args.image);
      const recipeDocument = await recipeModel.findByIdAndUpdate(
        args.id,
        { $set: recipeToSave },
        { new: true },
      );

      return recipeDocument && appendUserName(recipeDocument.toObject());
    },
    deleteRecipe: async (_, args: { id: string }, context: Context) => {
      if (!context.user || !(await checkUserRightsAsync(context.user.id, args.id))) {
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

function appendUserName(recipe: Recipe): Recipe {
  const user = findUserById(recipe.userId);

  return {
    ...recipe,
    userName: user ? user.name : '',
  };
}

async function prepareRecipe(
  recipe: RecipeInput,
  fileUpload?: Promise<FileUpload>,
  userId?: number,
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
      stream.on('data', (data: Buffer) => {
        bufs.push(data);
      });
      stream.on('end', () => {
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

  if (userId) {
    newRecipe = {
      ...newRecipe,
      userId,
    };
  }

  return newRecipe;
}

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}

async function checkUserRightsAsync(userId: number, recipeId: string) {
  if (superAdminIds.indexOf(userId) > -1) {
    return true;
  }

  const oldRecipe = await recipeModel.findById(recipeId);

  return Boolean(oldRecipe && oldRecipe.userId === userId);
}

export function getThumbPath(slug: string): string {
  return path.join(`/tmp/cookbook/thumbs/${slug}.jpg`);
}

import { ApolloServer, gql, IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';

import recipeModel, { Recipe, RecipeDocument } from './api/recipe/recipe.model';
import { findUserById } from './api/auth/auth.service';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    recipes: [Recipe!]!
    recipe(id: ID, slug: String): Recipe
  }

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
    amount: Int!
    amountUnit: String!
    name: String!
    isGroup: Boolean!
  }

  scalar Date
`;

// Provide resolver functions for your schema fields
const resolvers: IResolvers = {
  Query: {
    recipes: async () => (await recipeModel.find({})).map(r => r.toObject()).map(appendUserName),
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

export default new ApolloServer({ typeDefs, resolvers });

function appendUserName(recipe: Recipe): Recipe {
  const user = findUserById(recipe.userId);

  return {
    ...recipe,
    userName: user ? user.name : '',
  };
}

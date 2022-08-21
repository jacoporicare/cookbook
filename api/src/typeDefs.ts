import { gql } from 'apollo-server-core';

const typeDefs = gql`
  scalar Date
  scalar Upload

  input ImageSize {
    width: Int!
    height: Int!
  }

  enum ImageFormat {
    WEBP
  }

  type Recipe {
    id: ID!
    title: String!
    slug: String!
    directions: String
    sideDish: String
    preparationTime: Int
    servingCount: Int
    user: User!
    imageUrl(size: ImageSize, format: ImageFormat): String
    creationDate: Date!
    lastModifiedDate: Date!
    ingredients: [Ingredient!]
    tags: [String!]
    deleted: Boolean!
  }

  type Ingredient {
    id: ID!
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean!
  }

  type User {
    id: ID!
    username: String!
    displayName: String!
    isAdmin: Boolean!
    lastActivity: Date
  }

  type AuthPayload {
    token: String!
  }

  input RecipeInput {
    title: String!
    directions: String
    sideDish: String
    preparationTime: Int
    servingCount: Int
    ingredients: [IngredientInput!]
    tags: [String!]
  }

  input IngredientInput {
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean
  }

  input UserInput {
    username: String!
    displayName: String!
    isAdmin: Boolean
  }

  type Query {
    recipes(since: Date, deleted: Boolean): [Recipe!]!
    recipe(id: ID, slug: String): Recipe
    ingredients: [String!]!
    sideDishes: [String!]!
    tags: [String!]!
    me: User!
    users: [User!]!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createRecipe(recipe: RecipeInput!, image: Upload): Recipe!
    updateRecipe(id: ID!, recipe: RecipeInput!, image: Upload): Recipe!
    deleteRecipe(id: ID!): Boolean!
    updateUserLastActivity: Boolean!
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteUser(id: ID!): ID!
    resetPassword(id: ID!): String!
    changePassword(password: String!, newPassword: String!): Boolean!
  }
`;

export default typeDefs;

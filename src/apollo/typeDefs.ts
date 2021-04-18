import { gql } from '@apollo/client';

const typeDefs = gql`
  scalar Date
  scalar Upload

  type Recipe {
    _id: ID!
    title: String!
    slug: String!
    directions: String
    sideDish: String
    preparationTime: Int
    servingCount: Int
    user: User!
    image: Image
    creationDate: Date!
    lastModifiedDate: Date!
    ingredients: [Ingredient!]
    tags: [String!]
    deleted: Boolean!
  }

  type Image {
    fullUrl: String!
    thumbUrl: String!
    thumbWebPUrl: String!
  }

  type Ingredient {
    _id: ID!
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean
  }

  type AuthPayload {
    token: String!
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
    ingredients: [IngredientInput!]
    image: Upload
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
    users: [User!]
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

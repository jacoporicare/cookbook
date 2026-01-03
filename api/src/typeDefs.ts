import { gql } from 'apollo-server-core';

const typeDefs = gql`
  scalar Date

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
    user: User
    imageUrl(size: ImageSize, format: ImageFormat): String
    creationDate: Date!
    lastModifiedDate: Date!
    ingredients: [Ingredient!]!
    tags: [String!]!
    sousVideOptions: [SousVideOption!]!
    cookedHistory: [RecipeCooked!]!
    deleted: Boolean!
  }

  type Ingredient {
    id: ID!
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean!
  }

  type RecipeCooked {
    id: ID!
    date: Date!
    user: User
  }

  type SousVideOption {
    id: ID!
    temperature: Float!
    time: String!
    label: String!
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
    sousVideOptions: [SousVideOptionInput!]
  }

  input IngredientInput {
    amount: Float
    amountUnit: String
    name: String!
    isGroup: Boolean
  }

  input SousVideOptionInput {
    temperature: Float!
    time: String!
    label: String!
  }

  input UserInput {
    username: String!
    displayName: String!
    isAdmin: Boolean
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID, slug: String): Recipe
    ingredients: [String!]!
    sideDishes: [String!]!
    tags: [String!]!
    me: User!
    users: [User!]!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createRecipe(recipe: RecipeInput!, imageId: ID): Recipe!
    updateRecipe(id: ID!, recipe: RecipeInput!, imageId: ID): Recipe!
    deleteRecipe(id: ID!): Boolean!
    importRecipe(url: String!): Recipe!
    recipeCooked(id: ID!, date: Date!): Recipe!
    deleteRecipeCooked(recipeId: ID!, cookedId: ID!): Recipe!
    updateUserLastActivity: Boolean!
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteUser(id: ID!): ID!
    resetPassword(id: ID!): String!
    changePassword(password: String!, newPassword: String!): Boolean!
  }
`;

export default typeDefs;

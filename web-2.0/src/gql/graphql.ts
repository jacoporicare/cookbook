/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
};

export enum ImageFormat {
  Webp = 'WEBP'
}

export type ImageSize = {
  height: Scalars['Int']['input'];
  width: Scalars['Int']['input'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount?: Maybe<Scalars['Float']['output']>;
  amountUnit?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isGroup: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type IngredientInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  amountUnit?: InputMaybe<Scalars['String']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  createRecipe: Recipe;
  createUser: User;
  deleteRecipe: Scalars['Boolean']['output'];
  deleteUser: Scalars['ID']['output'];
  login: AuthPayload;
  recipeCooked: Recipe;
  resetPassword: Scalars['String']['output'];
  updateRecipe: Recipe;
  updateUser: User;
  updateUserLastActivity: Scalars['Boolean']['output'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateRecipeArgs = {
  image?: InputMaybe<Scalars['Upload']['input']>;
  recipe: RecipeInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRecipeCookedArgs = {
  date: Scalars['Date']['input'];
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  recipe: RecipeInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  ingredients: Array<Scalars['String']['output']>;
  me: User;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  sideDishes: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  users: Array<User>;
};


export type QueryRecipeArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  cookedHistory: Array<RecipeCooked>;
  creationDate: Scalars['Date']['output'];
  deleted: Scalars['Boolean']['output'];
  directions?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  ingredients: Array<Ingredient>;
  lastModifiedDate: Scalars['Date']['output'];
  preparationTime?: Maybe<Scalars['Int']['output']>;
  servingCount?: Maybe<Scalars['Int']['output']>;
  sideDish?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  user: User;
};


export type RecipeImageUrlArgs = {
  format?: InputMaybe<ImageFormat>;
  size?: InputMaybe<ImageSize>;
};

export type RecipeCooked = {
  __typename?: 'RecipeCooked';
  date: Scalars['Date']['output'];
  user: User;
};

export type RecipeInput = {
  directions?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<IngredientInput>>;
  preparationTime?: InputMaybe<Scalars['Int']['input']>;
  servingCount?: InputMaybe<Scalars['Int']['input']>;
  sideDish?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  lastActivity?: Maybe<Scalars['Date']['output']>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  displayName: Scalars['String']['input'];
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};

export type RecipeItemFragment = { __typename?: 'Recipe', id: string, slug: string, title: string, sideDish?: string | null, tags: Array<string>, preparationTime?: number | null, imageUrl?: string | null, lastModifiedDate: any, imageWebPUrl?: string | null, imageThumbUrl?: string | null, imageThumbWebPUrl?: string | null } & { ' $fragmentName'?: 'RecipeItemFragment' };

export type RecipeListQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeListQuery = { __typename?: 'Query', tags: Array<string>, recipes: Array<(
    { __typename?: 'Recipe' }
    & { ' $fragmentRefs'?: { 'RecipeItemFragment': RecipeItemFragment } }
  )> };

export const RecipeItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sideDish"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","alias":{"kind":"Name","value":"imageWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}}]}}]} as unknown as DocumentNode<RecipeItemFragment, unknown>;
export const RecipeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecipeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sideDish"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","alias":{"kind":"Name","value":"imageWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}}]}}]} as unknown as DocumentNode<RecipeListQuery, RecipeListQueryVariables>;
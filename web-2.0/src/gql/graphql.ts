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
  deleteRecipeCooked: Recipe;
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


export type MutationDeleteRecipeCookedArgs = {
  cookedId: Scalars['ID']['input'];
  recipeId: Scalars['ID']['input'];
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
  id: Scalars['ID']['output'];
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

export type RecipeItemFragment = { __typename?: 'Recipe', id: string, slug: string, title: string, imageThumbWebPUrl?: string | null } & { ' $fragmentName'?: 'RecipeItemFragment' };

export type RecipeListQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeListQuery = { __typename?: 'Query', recipes: Array<(
    { __typename?: 'Recipe', id: string }
    & { ' $fragmentRefs'?: { 'RecipeItemFragment': RecipeItemFragment } }
  )> };

export type RecipeDetailIngredientItemFragment = { __typename?: 'Ingredient', id: string, isGroup: boolean, name: string, amount?: number | null, amountUnit?: string | null } & { ' $fragmentName'?: 'RecipeDetailIngredientItemFragment' };

export type RecipeDetailItemFragment = { __typename?: 'Recipe', id: string, slug: string, title: string, tags: Array<string>, directions?: string | null, imageUrl?: string | null, sideDish?: string | null, servingCount?: number | null, preparationTime?: number | null, lastModifiedDate: any, imageUrl?: string | null, imageThumbUrl?: string | null, user: { __typename?: 'User', id: string, displayName: string }, ingredients: Array<(
    { __typename?: 'Ingredient' }
    & { ' $fragmentRefs'?: { 'RecipeDetailIngredientItemFragment': RecipeDetailIngredientItemFragment } }
  )> } & { ' $fragmentName'?: 'RecipeDetailItemFragment' };

export type RecipeDetailUserFragment = { __typename?: 'User', id: string, isAdmin: boolean } & { ' $fragmentName'?: 'RecipeDetailUserFragment' };

export type RecipeDetailQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type RecipeDetailQuery = { __typename?: 'Query', recipe?: (
    { __typename?: 'Recipe' }
    & { ' $fragmentRefs'?: { 'RecipeDetailItemFragment': RecipeDetailItemFragment } }
  ) | null, me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'RecipeDetailUserFragment': RecipeDetailUserFragment } }
  ) };

export const RecipeItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]}]}}]} as unknown as DocumentNode<RecipeItemFragment, unknown>;
export const RecipeDetailIngredientItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailIngredientItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ingredient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amountUnit"}}]}}]} as unknown as DocumentNode<RecipeDetailIngredientItemFragment, unknown>;
export const RecipeDetailItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"sideDish"}},{"kind":"Field","name":{"kind":"Name","value":"servingCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","alias":{"kind":"Name","value":"imageUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDetailIngredientItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailIngredientItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ingredient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amountUnit"}}]}}]} as unknown as DocumentNode<RecipeDetailItemFragment, unknown>;
export const RecipeDetailUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}}]}}]} as unknown as DocumentNode<RecipeDetailUserFragment, unknown>;
export const RecipeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecipeList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbWebPUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]}]}}]} as unknown as DocumentNode<RecipeListQuery, RecipeListQueryVariables>;
export const RecipeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecipeDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDetailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDetailUser"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailIngredientItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ingredient"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amountUnit"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"directions"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"sideDish"}},{"kind":"Field","name":{"kind":"Name","value":"servingCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","alias":{"kind":"Name","value":"imageUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","alias":{"kind":"Name","value":"imageThumbUrl"},"name":{"kind":"Name","value":"imageUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"IntValue","value":"800"}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"IntValue","value":"800"}}]}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"WEBP"}}]},{"kind":"Field","name":{"kind":"Name","value":"lastModifiedDate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeDetailIngredientItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeDetailUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isAdmin"}}]}}]} as unknown as DocumentNode<RecipeDetailQuery, RecipeDetailQueryVariables>;
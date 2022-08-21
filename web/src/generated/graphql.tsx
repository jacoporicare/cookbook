import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export enum ImageFormat {
  Webp = 'WEBP'
}

export type ImageSize = {
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount: Maybe<Scalars['Float']>;
  amountUnit: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isGroup: Scalars['Boolean'];
  name: Scalars['String'];
};

export type IngredientInput = {
  amount: InputMaybe<Scalars['Float']>;
  amountUnit: InputMaybe<Scalars['String']>;
  isGroup: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  createRecipe: Recipe;
  createUser: User;
  deleteRecipe: Scalars['Boolean'];
  deleteUser: Scalars['ID'];
  login: AuthPayload;
  resetPassword: Scalars['String'];
  updateRecipe: Recipe;
  updateUser: User;
  updateUserLastActivity: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateRecipeArgs = {
  image: InputMaybe<Scalars['Upload']>;
  recipe: RecipeInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  image: InputMaybe<Scalars['Upload']>;
  recipe: RecipeInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  ingredients: Array<Scalars['String']>;
  me: User;
  recipe: Maybe<Recipe>;
  recipes: Array<Recipe>;
  sideDishes: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  users: Array<User>;
};


export type QueryRecipeArgs = {
  id: InputMaybe<Scalars['ID']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryRecipesArgs = {
  deleted: InputMaybe<Scalars['Boolean']>;
  since: InputMaybe<Scalars['Date']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  creationDate: Scalars['Date'];
  deleted: Scalars['Boolean'];
  directions: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl: Maybe<Scalars['String']>;
  ingredients: Maybe<Array<Ingredient>>;
  lastModifiedDate: Scalars['Date'];
  preparationTime: Maybe<Scalars['Int']>;
  servingCount: Maybe<Scalars['Int']>;
  sideDish: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  tags: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  user: User;
};


export type RecipeImageUrlArgs = {
  format: InputMaybe<ImageFormat>;
  size: InputMaybe<ImageSize>;
};

export type RecipeInput = {
  directions: InputMaybe<Scalars['String']>;
  ingredients: InputMaybe<Array<IngredientInput>>;
  preparationTime: InputMaybe<Scalars['Int']>;
  servingCount: InputMaybe<Scalars['Int']>;
  sideDish: InputMaybe<Scalars['String']>;
  tags: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  lastActivity: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type UserInput = {
  displayName: Scalars['String'];
  isAdmin: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean } };

export type CreateRecipeMutationVariables = Exact<{
  recipe: RecipeInput;
  image: InputMaybe<Scalars['Upload']>;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', directions: string | null, servingCount: number | null, id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, amount: number | null, amountUnit: string | null, isGroup: boolean }> | null, user: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } } };

export type CreateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe: boolean };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string } };

export type RecipeBaseFragment = { __typename?: 'Recipe', id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null };

export type RecipeDetailQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RecipeDetailQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipe', directions: string | null, servingCount: number | null, id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, amount: number | null, amountUnit: string | null, isGroup: boolean }> | null, user: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } } | null };

export type RecipeDetailFragment = { __typename?: 'Recipe', directions: string | null, servingCount: number | null, id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, amount: number | null, amountUnit: string | null, isGroup: boolean }> | null, user: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } };

export type RecipeEditQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RecipeEditQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipe', directions: string | null, servingCount: number | null, id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, amount: number | null, amountUnit: string | null, isGroup: boolean }> | null, user: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } } | null };

export type RecipeEditOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeEditOptionsQuery = { __typename?: 'Query', ingredients: Array<string>, sideDishes: Array<string>, tags: Array<string> };

export type RecipeListQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeListQuery = { __typename?: 'Query', tags: Array<string>, recipes: Array<{ __typename?: 'Recipe', id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null }> };

export type ResetPasswordMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['ID'];
  recipe: RecipeInput;
  image: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe: { __typename?: 'Recipe', directions: string | null, servingCount: number | null, id: string, slug: string, title: string, sideDish: string | null, tags: Array<string> | null, preparationTime: number | null, imageUrl: string | null, lastModifiedDate: string, imageWebPUrl: string | null, imageThumbUrl: string | null, imageThumbWebPUrl: string | null, ingredients: Array<{ __typename?: 'Ingredient', id: string, name: string, amount: number | null, amountUnit: string | null, isGroup: boolean }> | null, user: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null } };

export type UpdateUserLastActivityMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateUserLastActivityMutation = { __typename?: 'Mutation', updateUserLastActivity: boolean };

export type UserFragment = { __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null };

export type UserListQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, displayName: string, isAdmin: boolean, lastActivity: string | null }> };

export const RecipeBaseFragmentDoc = gql`
    fragment recipeBase on Recipe {
  id
  slug
  title
  sideDish
  tags
  preparationTime
  imageUrl
  imageWebPUrl: imageUrl(format: WEBP)
  imageThumbUrl: imageUrl(size: {width: 800, height: 800})
  imageThumbWebPUrl: imageUrl(size: {width: 800, height: 800}, format: WEBP)
  lastModifiedDate
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  username
  displayName
  isAdmin
  lastActivity
}
    `;
export const RecipeDetailFragmentDoc = gql`
    fragment recipeDetail on Recipe {
  ...recipeBase
  directions
  servingCount
  ingredients {
    id
    name
    amount
    amountUnit
    isGroup
  }
  user {
    ...user
  }
}
    ${RecipeBaseFragmentDoc}
${UserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $newPassword: String!) {
  changePassword(password: $password, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    displayName
    isAdmin
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($recipe: RecipeInput!, $image: Upload) {
  createRecipe(recipe: $recipe, image: $image) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      recipe: // value for 'recipe'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: UserInput!) {
  createUser(user: $user) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: ID!) {
  deleteRecipe(id: $id)
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, options);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RecipeDetailDocument = gql`
    query RecipeDetail($slug: String!) {
  recipe(slug: $slug) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;

/**
 * __useRecipeDetailQuery__
 *
 * To run a query within a React component, call `useRecipeDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeDetailQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRecipeDetailQuery(baseOptions: Apollo.QueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, options);
      }
export function useRecipeDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, options);
        }
export type RecipeDetailQueryHookResult = ReturnType<typeof useRecipeDetailQuery>;
export type RecipeDetailLazyQueryHookResult = ReturnType<typeof useRecipeDetailLazyQuery>;
export type RecipeDetailQueryResult = Apollo.QueryResult<RecipeDetailQuery, RecipeDetailQueryVariables>;
export const RecipeEditDocument = gql`
    query RecipeEdit($slug: String!) {
  recipe(slug: $slug) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;

/**
 * __useRecipeEditQuery__
 *
 * To run a query within a React component, call `useRecipeEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeEditQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRecipeEditQuery(baseOptions: Apollo.QueryHookOptions<RecipeEditQuery, RecipeEditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeEditQuery, RecipeEditQueryVariables>(RecipeEditDocument, options);
      }
export function useRecipeEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeEditQuery, RecipeEditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeEditQuery, RecipeEditQueryVariables>(RecipeEditDocument, options);
        }
export type RecipeEditQueryHookResult = ReturnType<typeof useRecipeEditQuery>;
export type RecipeEditLazyQueryHookResult = ReturnType<typeof useRecipeEditLazyQuery>;
export type RecipeEditQueryResult = Apollo.QueryResult<RecipeEditQuery, RecipeEditQueryVariables>;
export const RecipeEditOptionsDocument = gql`
    query RecipeEditOptions {
  ingredients
  sideDishes
  tags
}
    `;

/**
 * __useRecipeEditOptionsQuery__
 *
 * To run a query within a React component, call `useRecipeEditOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeEditOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeEditOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipeEditOptionsQuery(baseOptions?: Apollo.QueryHookOptions<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>(RecipeEditOptionsDocument, options);
      }
export function useRecipeEditOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>(RecipeEditOptionsDocument, options);
        }
export type RecipeEditOptionsQueryHookResult = ReturnType<typeof useRecipeEditOptionsQuery>;
export type RecipeEditOptionsLazyQueryHookResult = ReturnType<typeof useRecipeEditOptionsLazyQuery>;
export type RecipeEditOptionsQueryResult = Apollo.QueryResult<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>;
export const RecipeListDocument = gql`
    query RecipeList {
  recipes {
    ...recipeBase
  }
  tags
}
    ${RecipeBaseFragmentDoc}`;

/**
 * __useRecipeListQuery__
 *
 * To run a query within a React component, call `useRecipeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeListQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipeListQuery(baseOptions?: Apollo.QueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, options);
      }
export function useRecipeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, options);
        }
export type RecipeListQueryHookResult = ReturnType<typeof useRecipeListQuery>;
export type RecipeListLazyQueryHookResult = ReturnType<typeof useRecipeListLazyQuery>;
export type RecipeListQueryResult = Apollo.QueryResult<RecipeListQuery, RecipeListQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($id: ID!) {
  resetPassword(id: $id)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!, $image: Upload) {
  updateRecipe(id: $id, recipe: $recipe, image: $image) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;
export type UpdateRecipeMutationFn = Apollo.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      recipe: // value for 'recipe'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, options);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = Apollo.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserLastActivityDocument = gql`
    mutation UpdateUserLastActivity {
  updateUserLastActivity
}
    `;
export type UpdateUserLastActivityMutationFn = Apollo.MutationFunction<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>;

/**
 * __useUpdateUserLastActivityMutation__
 *
 * To run a mutation, you first call `useUpdateUserLastActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserLastActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserLastActivityMutation, { data, loading, error }] = useUpdateUserLastActivityMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateUserLastActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>(UpdateUserLastActivityDocument, options);
      }
export type UpdateUserLastActivityMutationHookResult = ReturnType<typeof useUpdateUserLastActivityMutation>;
export type UpdateUserLastActivityMutationResult = Apollo.MutationResult<UpdateUserLastActivityMutation>;
export type UpdateUserLastActivityMutationOptions = Apollo.BaseMutationOptions<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>;
export const UserListDocument = gql`
    query UserList {
  users {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;
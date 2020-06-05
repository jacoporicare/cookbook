/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Maybe<Scalars['String']>;
};


export type Image = {
  __typename?: 'Image';
  fullUrl: Scalars['String'];
  thumbUrl: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  _id: Scalars['ID'];
  amount: Maybe<Scalars['Float']>;
  amountUnit: Maybe<Scalars['String']>;
  name: Scalars['String'];
  isGroup: Maybe<Scalars['Boolean']>;
};

export type IngredientInput = {
  amount: Maybe<Scalars['Float']>;
  amountUnit: Maybe<Scalars['String']>;
  name: Scalars['String'];
  isGroup: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  createRecipe: Maybe<Recipe>;
  updateRecipe: Maybe<Recipe>;
  deleteRecipe: Scalars['Boolean'];
  updateUserLastActivity: Scalars['Boolean'];
  createUser: Maybe<User>;
  updateUser: Maybe<User>;
  deleteUser: Maybe<Scalars['ID']>;
  resetPassword: Maybe<Scalars['String']>;
  changePassword: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Maybe<Scalars['String']>;
};


export type MutationCreateRecipeArgs = {
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user: UserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  recipes: Array<Recipe>;
  recipe: Maybe<Recipe>;
  ingredients: Array<Scalars['String']>;
  sideDishes: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  me: Maybe<User>;
  users: Maybe<Array<User>>;
};


export type QueryRecipeArgs = {
  id: Maybe<Scalars['ID']>;
  slug: Maybe<Scalars['String']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  _id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  directions: Maybe<Scalars['String']>;
  sideDish: Maybe<Scalars['String']>;
  preparationTime: Maybe<Scalars['Int']>;
  servingCount: Maybe<Scalars['Int']>;
  user: User;
  image: Maybe<Image>;
  creationDate: Scalars['Date'];
  lastModifiedDate: Scalars['Date'];
  ingredients: Maybe<Array<Ingredient>>;
  tags: Maybe<Array<Scalars['String']>>;
};

export type RecipeInput = {
  title: Scalars['String'];
  directions: Maybe<Scalars['String']>;
  sideDish: Maybe<Scalars['String']>;
  preparationTime: Maybe<Scalars['Int']>;
  servingCount: Maybe<Scalars['Int']>;
  ingredients: Maybe<Array<IngredientInput>>;
  image: Maybe<Scalars['Upload']>;
  tags: Maybe<Array<Scalars['String']>>;
};


export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  displayName: Scalars['String'];
  isAdmin: Maybe<Scalars['Boolean']>;
  lastActivity: Maybe<Scalars['Date']>;
};

export type UserInput = {
  username: Scalars['String'];
  displayName: Scalars['String'];
  isAdmin: Maybe<Scalars['Boolean']>;
};

export type ChangePasswordMutationVariables = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'displayName' | 'isAdmin'>
  )> }
);

export type CreateRecipeMutationVariables = {
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type CreateRecipeMutation = (
  { __typename?: 'Mutation' }
  & { createRecipe: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )> }
);

export type CreateUserMutationVariables = {
  user: UserInput;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type DeleteRecipeMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteRecipeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRecipe'>
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type RecipeBaseFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, '_id' | 'slug' | 'title' | 'sideDish' | 'tags' | 'preparationTime' | 'lastModifiedDate'>
  & { image: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'fullUrl' | 'thumbUrl'>
  )> }
);

export type RecipeDetailQueryVariables = {
  slug: Scalars['String'];
};


export type RecipeDetailQuery = (
  { __typename?: 'Query' }
  & { recipe: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )>, me: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type RecipeDetailFragment = (
  { __typename?: 'Recipe' }
  & Pick<Recipe, 'directions' | 'servingCount'>
  & { ingredients: Maybe<Array<(
    { __typename?: 'Ingredient' }
    & Pick<Ingredient, '_id' | 'name' | 'amount' | 'amountUnit' | 'isGroup'>
  )>>, user: (
    { __typename?: 'User' }
    & UserFragment
  ) }
  & RecipeBaseFragment
);

export type RecipeEditQueryVariables = {
  slug: Scalars['String'];
};


export type RecipeEditQuery = (
  { __typename?: 'Query' }
  & { recipe: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )> }
);

export type RecipeEditOptionsQueryVariables = {};


export type RecipeEditOptionsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'ingredients' | 'sideDishes' | 'tags'>
);

export type RecipeListQueryVariables = {};


export type RecipeListQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'tags'>
  & { recipes: Array<(
    { __typename?: 'Recipe' }
    & RecipeBaseFragment
  )> }
);

export type ResetPasswordMutationVariables = {
  id: Scalars['ID'];
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type UpdateRecipeMutationVariables = {
  id: Scalars['ID'];
  recipe: RecipeInput;
  image: Maybe<Scalars['Upload']>;
};


export type UpdateRecipeMutation = (
  { __typename?: 'Mutation' }
  & { updateRecipe: Maybe<(
    { __typename?: 'Recipe' }
    & RecipeDetailFragment
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'];
  user: UserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type UpdateUserLastActivityMutationVariables = {};


export type UpdateUserLastActivityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUserLastActivity'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'username' | 'displayName' | 'isAdmin' | 'lastActivity'>
);

export type UserListQueryVariables = {};


export type UserListQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragment
  )>> }
);

export const RecipeBaseFragmentDoc = gql`
    fragment recipeBase on Recipe {
  _id
  slug
  title
  sideDish
  tags
  preparationTime
  image {
    fullUrl
    thumbUrl
  }
  lastModifiedDate
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  _id
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
    _id
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
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

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
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($recipe: RecipeInput!, $image: Upload) {
  createRecipe(recipe: $recipe, image: $image) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;
export type CreateRecipeMutationFn = ApolloReactCommon.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

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
export function useCreateRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, baseOptions);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = ApolloReactCommon.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: UserInput!) {
  createUser(user: $user) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: ID!) {
  deleteRecipe(id: $id)
}
    `;
export type DeleteRecipeMutationFn = ApolloReactCommon.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

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
export function useDeleteRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, baseOptions);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = ApolloReactCommon.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

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
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RecipeDetailDocument = gql`
    query RecipeDetail($slug: String!) {
  recipe(slug: $slug) {
    ...recipeDetail
  }
  me {
    ...user
  }
}
    ${RecipeDetailFragmentDoc}
${UserFragmentDoc}`;

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
export function useRecipeDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, baseOptions);
      }
export function useRecipeDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeDetailQuery, RecipeDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeDetailQuery, RecipeDetailQueryVariables>(RecipeDetailDocument, baseOptions);
        }
export type RecipeDetailQueryHookResult = ReturnType<typeof useRecipeDetailQuery>;
export type RecipeDetailLazyQueryHookResult = ReturnType<typeof useRecipeDetailLazyQuery>;
export type RecipeDetailQueryResult = ApolloReactCommon.QueryResult<RecipeDetailQuery, RecipeDetailQueryVariables>;
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
export function useRecipeEditQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeEditQuery, RecipeEditQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeEditQuery, RecipeEditQueryVariables>(RecipeEditDocument, baseOptions);
      }
export function useRecipeEditLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeEditQuery, RecipeEditQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeEditQuery, RecipeEditQueryVariables>(RecipeEditDocument, baseOptions);
        }
export type RecipeEditQueryHookResult = ReturnType<typeof useRecipeEditQuery>;
export type RecipeEditLazyQueryHookResult = ReturnType<typeof useRecipeEditLazyQuery>;
export type RecipeEditQueryResult = ApolloReactCommon.QueryResult<RecipeEditQuery, RecipeEditQueryVariables>;
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
export function useRecipeEditOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>(RecipeEditOptionsDocument, baseOptions);
      }
export function useRecipeEditOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>(RecipeEditOptionsDocument, baseOptions);
        }
export type RecipeEditOptionsQueryHookResult = ReturnType<typeof useRecipeEditOptionsQuery>;
export type RecipeEditOptionsLazyQueryHookResult = ReturnType<typeof useRecipeEditOptionsLazyQuery>;
export type RecipeEditOptionsQueryResult = ApolloReactCommon.QueryResult<RecipeEditOptionsQuery, RecipeEditOptionsQueryVariables>;
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
export function useRecipeListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, baseOptions);
      }
export function useRecipeListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeListQuery, RecipeListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeListQuery, RecipeListQueryVariables>(RecipeListDocument, baseOptions);
        }
export type RecipeListQueryHookResult = ReturnType<typeof useRecipeListQuery>;
export type RecipeListLazyQueryHookResult = ReturnType<typeof useRecipeListLazyQuery>;
export type RecipeListQueryResult = ApolloReactCommon.QueryResult<RecipeListQuery, RecipeListQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($id: ID!) {
  resetPassword(id: $id)
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

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
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!, $image: Upload) {
  updateRecipe(id: $id, recipe: $recipe, image: $image) {
    ...recipeDetail
  }
}
    ${RecipeDetailFragmentDoc}`;
export type UpdateRecipeMutationFn = ApolloReactCommon.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

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
export function useUpdateRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, baseOptions);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = ApolloReactCommon.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $user: UserInput!) {
  updateUser(id: $id, user: $user) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

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
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserLastActivityDocument = gql`
    mutation UpdateUserLastActivity {
  updateUserLastActivity
}
    `;
export type UpdateUserLastActivityMutationFn = ApolloReactCommon.MutationFunction<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>;

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
export function useUpdateUserLastActivityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>(UpdateUserLastActivityDocument, baseOptions);
      }
export type UpdateUserLastActivityMutationHookResult = ReturnType<typeof useUpdateUserLastActivityMutation>;
export type UpdateUserLastActivityMutationResult = ApolloReactCommon.MutationResult<UpdateUserLastActivityMutation>;
export type UpdateUserLastActivityMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserLastActivityMutation, UpdateUserLastActivityMutationVariables>;
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
export function useUserListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        return ApolloReactHooks.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, baseOptions);
      }
export function useUserListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, baseOptions);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = ApolloReactCommon.QueryResult<UserListQuery, UserListQueryVariables>;

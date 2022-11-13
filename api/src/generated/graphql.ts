import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Upload: Promise<FileUpload>;
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
  amount?: Maybe<Scalars['Float']>;
  amountUnit?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isGroup: Scalars['Boolean'];
  name: Scalars['String'];
};

export type IngredientInput = {
  amount?: InputMaybe<Scalars['Float']>;
  amountUnit?: InputMaybe<Scalars['String']>;
  isGroup?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  createRecipe: Recipe;
  createUser: User;
  deleteRecipe: Scalars['Boolean'];
  deleteRecipeCooked: Recipe;
  deleteUser: Scalars['ID'];
  login: AuthPayload;
  recipeCooked: Recipe;
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
  image?: InputMaybe<Scalars['Upload']>;
  recipe: RecipeInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRecipeCookedArgs = {
  cookedId: Scalars['ID'];
  recipeId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRecipeCookedArgs = {
  date: Scalars['Date'];
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['Upload']>;
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
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  sideDishes: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  users: Array<User>;
};


export type QueryRecipeArgs = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryRecipesArgs = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  since?: InputMaybe<Scalars['Date']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  cookedHistory: Array<RecipeCooked>;
  creationDate: Scalars['Date'];
  deleted: Scalars['Boolean'];
  directions?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  ingredients: Array<Ingredient>;
  lastModifiedDate: Scalars['Date'];
  preparationTime?: Maybe<Scalars['Int']>;
  servingCount?: Maybe<Scalars['Int']>;
  sideDish?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  user: User;
};


export type RecipeImageUrlArgs = {
  format?: InputMaybe<ImageFormat>;
  size?: InputMaybe<ImageSize>;
};

export type RecipeCooked = {
  __typename?: 'RecipeCooked';
  date: Scalars['Date'];
  id: Scalars['ID'];
  user: User;
};

export type RecipeInput = {
  directions?: InputMaybe<Scalars['String']>;
  ingredients?: InputMaybe<Array<IngredientInput>>;
  preparationTime?: InputMaybe<Scalars['Int']>;
  servingCount?: InputMaybe<Scalars['Int']>;
  sideDish?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  lastActivity?: Maybe<Scalars['Date']>;
  username: Scalars['String'];
};

export type UserInput = {
  displayName: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageFormat: ImageFormat;
  ImageSize: ImageSize;
  Ingredient: ResolverTypeWrapper<Ingredient>;
  IngredientInput: IngredientInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeCooked: ResolverTypeWrapper<RecipeCooked>;
  RecipeInput: RecipeInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  ImageSize: ImageSize;
  Ingredient: Ingredient;
  IngredientInput: IngredientInput;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Recipe: Recipe;
  RecipeCooked: RecipeCooked;
  RecipeInput: RecipeInput;
  String: Scalars['String'];
  Upload: Scalars['Upload'];
  User: User;
  UserInput: UserInput;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type IngredientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ingredient'] = ResolversParentTypes['Ingredient']> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amountUnit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isGroup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'password'>>;
  createRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationCreateRecipeArgs, 'recipe'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteRecipe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRecipeArgs, 'id'>>;
  deleteRecipeCooked?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationDeleteRecipeCookedArgs, 'cookedId' | 'recipeId'>>;
  deleteUser?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  recipeCooked?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationRecipeCookedArgs, 'date' | 'id'>>;
  resetPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'id'>>;
  updateRecipe?: Resolver<ResolversTypes['Recipe'], ParentType, ContextType, RequireFields<MutationUpdateRecipeArgs, 'id' | 'recipe'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'user'>>;
  updateUserLastActivity?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  ingredients?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  recipe?: Resolver<Maybe<ResolversTypes['Recipe']>, ParentType, ContextType, Partial<QueryRecipeArgs>>;
  recipes?: Resolver<Array<ResolversTypes['Recipe']>, ParentType, ContextType, Partial<QueryRecipesArgs>>;
  sideDishes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RecipeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe']> = {
  cookedHistory?: Resolver<Array<ResolversTypes['RecipeCooked']>, ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  directions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<RecipeImageUrlArgs>>;
  ingredients?: Resolver<Array<ResolversTypes['Ingredient']>, ParentType, ContextType>;
  lastModifiedDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  preparationTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  servingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sideDish?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecipeCookedResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecipeCooked'] = ResolversParentTypes['RecipeCooked']> = {
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastActivity?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Ingredient?: IngredientResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeCooked?: RecipeCookedResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


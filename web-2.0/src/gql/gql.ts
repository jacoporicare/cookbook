/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  fragment RecipeItem on Recipe {\n    id\n    slug\n    title\n    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n  }\n": types.RecipeItemFragmentDoc,
    "\n  #graphql\n  query RecipeList {\n    recipes {\n      id\n      ...RecipeItem\n    }\n    tags\n  }\n": types.RecipeListDocument,
    "\n  #graphql\n  fragment RecipeDetailIngredientItem on Ingredient {\n    id\n    isGroup\n    name\n    amount\n    amountUnit\n  }\n": types.RecipeDetailIngredientItemFragmentDoc,
    "\n  #graphql\n  fragment RecipeDetailItem on Recipe {\n    id\n    slug\n    title\n    tags\n    directions\n    imageUrl(format: WEBP)\n    sideDish\n    servingCount\n    tags\n    preparationTime\n    imageUrl: imageUrl(format: WEBP)\n    imageThumbUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n    lastModifiedDate\n    user {\n      displayName\n    }\n    ingredients {\n      ...RecipeDetailIngredientItem\n    }\n  }\n": types.RecipeDetailItemFragmentDoc,
    "\n  #graphql\n  query RecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      ...RecipeDetailItem\n    }\n  }\n": types.RecipeDetailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  fragment RecipeItem on Recipe {\n    id\n    slug\n    title\n    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n  }\n"): (typeof documents)["\n  #graphql\n  fragment RecipeItem on Recipe {\n    id\n    slug\n    title\n    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query RecipeList {\n    recipes {\n      id\n      ...RecipeItem\n    }\n    tags\n  }\n"): (typeof documents)["\n  #graphql\n  query RecipeList {\n    recipes {\n      id\n      ...RecipeItem\n    }\n    tags\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  fragment RecipeDetailIngredientItem on Ingredient {\n    id\n    isGroup\n    name\n    amount\n    amountUnit\n  }\n"): (typeof documents)["\n  #graphql\n  fragment RecipeDetailIngredientItem on Ingredient {\n    id\n    isGroup\n    name\n    amount\n    amountUnit\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  fragment RecipeDetailItem on Recipe {\n    id\n    slug\n    title\n    tags\n    directions\n    imageUrl(format: WEBP)\n    sideDish\n    servingCount\n    tags\n    preparationTime\n    imageUrl: imageUrl(format: WEBP)\n    imageThumbUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n    lastModifiedDate\n    user {\n      displayName\n    }\n    ingredients {\n      ...RecipeDetailIngredientItem\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  fragment RecipeDetailItem on Recipe {\n    id\n    slug\n    title\n    tags\n    directions\n    imageUrl(format: WEBP)\n    sideDish\n    servingCount\n    tags\n    preparationTime\n    imageUrl: imageUrl(format: WEBP)\n    imageThumbUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)\n    lastModifiedDate\n    user {\n      displayName\n    }\n    ingredients {\n      ...RecipeDetailIngredientItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query RecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      ...RecipeDetailItem\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query RecipeDetail($slug: String!) {\n    recipe(slug: $slug) {\n      ...RecipeDetailItem\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
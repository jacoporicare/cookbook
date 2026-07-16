import { cacheLife, cacheTag } from 'next/cache';

import {
  RecipeBaseFragment,
  RecipeDetailDocument,
  RecipeDetailQuery,
  RecipeEditOptionsDocument,
  RecipeListDocument,
} from '@/generated/graphql';

import { getPublicClient } from './apollo-client';

/**
 * Cached public recipe data.
 *
 * These functions run against the anonymous `getPublicClient()` (no cookies)
 * and are wrapped in the `use cache` directive so their results are cached by
 * Next.js. They are tagged so mutations can invalidate them precisely with
 * `revalidateTag` (see `app/actions/recipe.ts`).
 *
 * The recipe queries are user-agnostic on the API (no `authenticated()`
 * wrapper), so caching a single shared result is safe for every visitor.
 */

export const RECIPES_TAG = 'recipes';
export const RECIPE_OPTIONS_TAG = 'recipe-options';

export function recipeTag(slug: string): string {
  return `recipe:${slug}`;
}

export async function getCachedRecipeList(): Promise<{
  recipes: RecipeBaseFragment[];
  tags: string[];
}> {
  'use cache';
  cacheTag(RECIPES_TAG);
  cacheLife('days');

  const { data } = await getPublicClient().query({ query: RecipeListDocument });

  return {
    recipes: data?.recipes ?? [],
    tags: data?.tags ?? [],
  };
}

export async function getCachedRecipe(
  slug: string,
): Promise<RecipeDetailQuery['recipe']> {
  'use cache';
  cacheTag(RECIPES_TAG, recipeTag(slug));
  cacheLife('days');

  const { data } = await getPublicClient().query({
    query: RecipeDetailDocument,
    variables: { slug },
  });

  return data?.recipe ?? null;
}

export async function getCachedRecipeEditOptions(): Promise<{
  ingredients: string[];
  sideDishes: string[];
  tags: string[];
}> {
  'use cache';
  cacheTag(RECIPE_OPTIONS_TAG);
  cacheLife('days');

  const { data } = await getPublicClient().query({
    query: RecipeEditOptionsDocument,
  });

  return {
    ingredients: data?.ingredients ?? [],
    sideDishes: data?.sideDishes ?? [],
    tags: data?.tags ?? [],
  };
}

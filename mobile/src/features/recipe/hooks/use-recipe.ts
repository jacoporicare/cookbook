import { ApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import {
  RecipeBySlugDocument,
  RecipeListDocument,
  type RecipeListQuery,
} from '@/generated/graphql';

const recipeBySlugMap = new Map<string, RecipeListQuery['recipes'][0]>();

export function watchRecipeBySlugMap(client: ApolloClient) {
  client.watchQuery({ query: RecipeListDocument }).subscribe(({ data }) => {
    if (data?.recipes) {
      recipeBySlugMap.clear();

      for (const recipe of data.recipes as RecipeListQuery['recipes']) {
        recipeBySlugMap.set(recipe.slug, recipe);
      }
    }
  });
}

export function useRecipe(slug: string) {
  const cachedRecipe = recipeBySlugMap.get(slug);

  const { data, loading, error } = useQuery(RecipeBySlugDocument, {
    variables: { slug },
    skip: !!cachedRecipe,
    fetchPolicy: 'cache-first',
  });

  return {
    recipe: cachedRecipe ?? data?.recipe ?? null,
    loading: !cachedRecipe && loading,
    error: !cachedRecipe ? error?.message : undefined,
  };
}

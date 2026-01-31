import { useMemo } from 'react';

import { RecipeBaseFragment } from '@/generated/graphql';

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function useRecipeSearch(
  recipes: RecipeBaseFragment[],
  searchText: string,
) {
  return useMemo(() => {
    const trimmed = searchText.trim();
    if (!trimmed) return recipes;

    const normalizedSearch = normalize(trimmed);

    return recipes.filter((recipe) => {
      const title = normalize(recipe.title);
      const sideDish = recipe.sideDish ? normalize(recipe.sideDish) : '';
      return (
        title.includes(normalizedSearch) || sideDish.includes(normalizedSearch)
      );
    });
  }, [recipes, searchText]);
}

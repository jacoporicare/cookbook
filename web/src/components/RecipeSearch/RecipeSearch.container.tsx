'use client';

import { useRouter } from 'next/navigation';

import { useRecipeListQuery } from '../../generated/graphql';

import RecipeSearch from './RecipeSearch';

function RecipeSearchContainer() {
  const router = useRouter();
  const { data } = useRecipeListQuery();

  function handleRecipeSelected(slug: string) {
    router.push(`/recept/${slug}`);
  }

  const recipes = data?.recipes ?? [];

  return <RecipeSearch recipes={recipes} onSelected={handleRecipeSelected} />;
}

export default RecipeSearchContainer;

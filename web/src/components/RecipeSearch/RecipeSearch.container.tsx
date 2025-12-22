'use client';

import { useRouter } from 'next/navigation';

import { useRecipes } from '../../app/RecipesProvider';
import RecipeSearch from './RecipeSearch';

function RecipeSearchContainer() {
  const router = useRouter();
  const recipes = useRecipes();

  function handleRecipeSelected(slug: string) {
    router.push(`/recept/${slug}`);
  }

  return <RecipeSearch recipes={recipes} onSelected={handleRecipeSelected} />;
}

export default RecipeSearchContainer;

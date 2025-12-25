'use client';

import { useRouter } from 'next/navigation';

import { RecipeBaseFragment } from '../../generated/graphql';
import { RecipeSearch } from './RecipeSearch';

type Props = {
  recipes: RecipeBaseFragment[];
};

export function RecipeSearchContainer(props: Props) {
  const router = useRouter();

  function handleRecipeSelected(slug: string) {
    router.push(`/recept/${slug}`);
  }

  return (
    <RecipeSearch recipes={props.recipes} onSelected={handleRecipeSelected} />
  );
}

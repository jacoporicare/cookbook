'use client';

import { useSearchParams } from 'next/navigation';
import slug from 'slug';

import { RecipeListQuery } from '@/generated/graphql';

import { RecipeListPage } from './RecipeListPage';

type Props = {
  recipes: RecipeListQuery['recipes'];
  tags: RecipeListQuery['tags'];
};

/**
 * Client-side tag filter over the fully-cached recipe list.
 *
 * The list itself is static (see `page.tsx`); reading the `stitek` filter from
 * the URL here — rather than from `searchParams` on the server — keeps `/`
 * statically prerenderable, so navigating back to it is instant instead of
 * flashing the loading skeleton while a dynamic render streams in. The parent
 * renders the unfiltered list as the Suspense fallback, so the static HTML
 * already shows every recipe; on the client this swaps in the filtered view.
 */
export function RecipeListFiltered({ recipes, tags }: Props) {
  const selectedTag = useSearchParams().get('stitek');

  const filtered = selectedTag
    ? recipes.filter((recipe) =>
        recipe.tags.some((t) => slug(t) === selectedTag),
      )
    : recipes;

  return (
    <RecipeListPage recipes={filtered} tags={tags} selectedTag={selectedTag} />
  );
}

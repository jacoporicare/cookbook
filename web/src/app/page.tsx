import type { Metadata } from 'next';
import { Suspense } from 'react';
import slug from 'slug';

import { Layout } from '@/components/Layout';
import { AuthedFab } from '@/components/RecipeList/AuthedFab';
import { RecipeListSkeleton } from '@/components/RecipeList/RecipeListSkeleton';
import { getCachedRecipeList } from '@/lib/recipes-cache';

import { RecipeListPage } from './RecipeListPage';

export const metadata: Metadata = {
  title: 'Recepty',
};

type Props = {
  searchParams: Promise<{ stitek?: string }>;
};

export default function Page({ searchParams }: Props) {
  return (
    <Layout>
      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeListContent searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={null}>
        <AuthedFab />
      </Suspense>
    </Layout>
  );
}

async function RecipeListContent({ searchParams }: Props) {
  const { stitek } = await searchParams;
  const { recipes: allRecipes, tags } = await getCachedRecipeList();

  // Filter recipes server-side by the selected tag
  const recipes = stitek
    ? allRecipes.filter((recipe) => recipe.tags.some((t) => slug(t) === stitek))
    : allRecipes;

  return (
    <RecipeListPage
      recipes={recipes}
      tags={tags}
      selectedTag={stitek ?? null}
    />
  );
}

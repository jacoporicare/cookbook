import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { AuthedFab } from '@/components/RecipeList/AuthedFab';
import { RecipeListSkeleton } from '@/components/RecipeList/RecipeListSkeleton';
import { getCachedRecipeList } from '@/lib/recipes-cache';

import { RecipeListFiltered } from './RecipeListFiltered';
import { RecipeListPage } from './RecipeListPage';

export const metadata: Metadata = {
  title: 'Recepty',
};

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeListContent />
      </Suspense>
      <AuthedFab />
    </Layout>
  );
}

async function RecipeListContent() {
  const { recipes, tags } = await getCachedRecipeList();

  // The recipe list is fully cached, so this whole component prerenders
  // statically — visiting `/` is instant instead of streaming a dynamic
  // render behind the skeleton. The `stitek` tag filter is applied on the
  // client (`RecipeListFiltered`) from the URL, which would otherwise force
  // this route to render dynamically. The unfiltered list is the Suspense
  // fallback, so the static HTML already shows every recipe.
  return (
    <Suspense
      fallback={
        <RecipeListPage recipes={recipes} tags={tags} selectedTag={null} />
      }
    >
      <RecipeListFiltered recipes={recipes} tags={tags} />
    </Suspense>
  );
}

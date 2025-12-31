import type { Metadata } from 'next';
import slug from 'slug';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

import { RecipeListPage } from './RecipeListPage';

export const metadata: Metadata = {
  title: 'Recepty',
};

type Props = {
  searchParams: Promise<{ stitek?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { stitek } = await searchParams;

  const client = await getClient();
  const currentUser = await getCurrentUser(client);
  const {
    recipes: allRecipes,
    tags,
    user,
  } = await getLayoutData({ client, currentUser });

  // Filter recipes server-side
  const recipes = stitek
    ? allRecipes.filter((recipe) => recipe.tags.some((t) => slug(t) === stitek))
    : allRecipes;

  return (
    <RecipeListPage
      recipes={recipes}
      allRecipes={allRecipes}
      tags={tags}
      user={user}
      selectedTag={stitek ?? null}
    />
  );
}

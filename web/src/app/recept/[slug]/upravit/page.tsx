import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/common/Spinner';
import { RecipeEditDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import {
  getCachedRecipe,
  getCachedRecipeEditOptions,
  getCachedRecipeList,
} from '@/lib/recipes-cache';

import { RecipeEditPage } from '../../../novy-recept/RecipeEditPage';

type Props = {
  params: Promise<{ slug: string }>;
};

// Prerender the static chrome for known recipe slugs so the path is known at
// build (the nav's usePathname resolves). The auth-gated edit form itself stays
// dynamic behind the Suspense boundary below.
export async function generateStaticParams() {
  const { recipes } = await getCachedRecipeList();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getCachedRecipe(slug);

  return {
    title: recipe ? `Upravit: ${recipe.title}` : 'Upravit recept',
  };
}

export default function Page({ params }: Props) {
  return (
    <Layout>
      <Suspense fallback={<Spinner overlay />}>
        <EditRecipeContent params={params} />
      </Suspense>
    </Layout>
  );
}

async function EditRecipeContent({ params }: Props) {
  const { slug } = await params;
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    redirect('/prihlaseni');
  }

  const [recipeResult, options] = await Promise.all([
    client.query({ query: RecipeEditDocument, variables: { slug } }),
    getCachedRecipeEditOptions(),
  ]);

  if (!recipeResult.data?.recipe) {
    notFound();
  }

  const recipe = recipeResult.data.recipe;
  const canEdit =
    currentUser.isAdmin || currentUser.username === recipe.user?.username;

  if (!canEdit) {
    redirect(`/recept/${slug}`);
  }

  return <RecipeEditPage recipe={recipe} options={options} />;
}

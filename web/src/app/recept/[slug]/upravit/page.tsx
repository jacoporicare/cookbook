import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { RecipeEditDocument, RecipeEditOptionsDocument } from '@/generated/graphql';

import RecipeEditPage from '../../../novy-recept/RecipeEditPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = await getClient();
  const { data } = await client.query({
    query: RecipeEditDocument,
    variables: { slug },
  });

  return {
    title: data.recipe ? `Upravit: ${data.recipe.title}` : 'Upravit recept',
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [client, user] = await Promise.all([getClient(), getCurrentUser()]);

  if (!user) {
    redirect('/prihlaseni');
  }

  const [recipeResult, optionsResult] = await Promise.all([
    client.query({ query: RecipeEditDocument, variables: { slug } }),
    client.query({ query: RecipeEditOptionsDocument }),
  ]);

  if (!recipeResult.data.recipe) {
    notFound();
  }

  // Check if user can edit this recipe
  const recipe = recipeResult.data.recipe;
  const canEdit = user.isAdmin || user.username === recipe.user.username;

  if (!canEdit) {
    redirect(`/recept/${slug}`);
  }

  return (
    <RecipeEditPage
      recipe={recipe}
      options={{
        ingredients: optionsResult.data.ingredients,
        sideDishes: optionsResult.data.sideDishes,
        tags: optionsResult.data.tags,
      }}
    />
  );
}

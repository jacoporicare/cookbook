import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import {
  RecipeEditOptionsDocument,
  RecipeListDocument,
} from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, toUser } from '@/lib/auth-server';

import { RecipeEditPage } from './RecipeEditPage';

export const metadata: Metadata = {
  title: 'Nový recept',
};

export default async function Page() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    redirect('/prihlaseni');
  }

  const [optionsResult, recipesResult] = await Promise.all([
    client.query({ query: RecipeEditOptionsDocument }),
    client.query({ query: RecipeListDocument }),
  ]);

  return (
    <RecipeEditPage
      options={{
        ingredients: optionsResult.data?.ingredients ?? [],
        sideDishes: optionsResult.data?.sideDishes ?? [],
        tags: optionsResult.data?.tags ?? [],
      }}
      recipes={recipesResult.data?.recipes ?? []}
      user={toUser(currentUser)}
    />
  );
}

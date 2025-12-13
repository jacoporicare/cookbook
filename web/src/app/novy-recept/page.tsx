import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { RecipeEditOptionsDocument } from '@/generated/graphql';

import RecipeEditPage from './RecipeEditPage';

export const metadata: Metadata = {
  title: 'Nový recept',
};

export default async function Page() {
  const [client, user] = await Promise.all([getClient(), getCurrentUser()]);

  if (!user) {
    redirect('/prihlaseni');
  }

  const { data } = await client.query({ query: RecipeEditOptionsDocument });

  return (
    <RecipeEditPage
      options={{
        ingredients: data.ingredients,
        sideDishes: data.sideDishes,
        tags: data.tags,
      }}
    />
  );
}

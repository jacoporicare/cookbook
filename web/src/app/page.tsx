import type { Metadata } from 'next';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { RecipeListDocument } from '@/generated/graphql';

import RecipeListPage from './RecipeListPage';

export const metadata: Metadata = {
  title: 'Recepty',
};

export default async function Page() {
  const [client, user] = await Promise.all([getClient(), getCurrentUser()]);
  const { data } = await client.query({ query: RecipeListDocument });

  return <RecipeListPage recipes={data.recipes} tags={data.tags} isLoggedIn={!!user} />;
}

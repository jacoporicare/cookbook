import type { Metadata } from 'next';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

import { RecipeListPage } from '../RecipeListPage';

export const metadata: Metadata = {
  title: 'Instant Pot recepty',
};

export default async function Page() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);
  const { recipes, tags, user } = await getLayoutData({ client, currentUser });

  return <RecipeListPage recipes={recipes} tags={tags} user={user} />;
}

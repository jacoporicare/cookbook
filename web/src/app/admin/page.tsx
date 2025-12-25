import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { RecipeListDocument, UserListDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, toUser } from '@/lib/auth-server';

import { AdminPage } from './AdminPage';

export const metadata: Metadata = {
  title: 'Správa uživatelů',
};

export default async function Page() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser?.isAdmin) {
    redirect('/');
  }

  const [usersResult, recipesResult] = await Promise.all([
    client.query({ query: UserListDocument }),
    client.query({ query: RecipeListDocument }),
  ]);

  return (
    <AdminPage
      users={usersResult.data?.users ?? []}
      currentUserId={currentUser.id}
      recipes={recipesResult.data?.recipes ?? []}
      user={toUser(currentUser)}
    />
  );
}

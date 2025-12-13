import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { UserListDocument } from '@/generated/graphql';

import AdminPage from './AdminPage';

export const metadata: Metadata = {
  title: 'Správa uživatelů',
};

export default async function Page() {
  const [client, user] = await Promise.all([getClient(), getCurrentUser()]);

  if (!user?.isAdmin) {
    redirect('/');
  }

  const { data } = await client.query({ query: UserListDocument });

  return <AdminPage users={data.users} currentUserId={user.id} />;
}

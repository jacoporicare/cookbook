import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/common/Spinner';
import { UserListDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

import { AdminPage } from './AdminPage';

export const metadata: Metadata = {
  title: 'Správa uživatelů',
};

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<Spinner overlay />}>
        <AdminContent />
      </Suspense>
    </Layout>
  );
}

async function AdminContent() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser?.isAdmin) {
    redirect('/');
  }

  const { data } = await client.query({ query: UserListDocument });

  return <AdminPage users={data?.users ?? []} currentUserId={currentUser.id} />;
}

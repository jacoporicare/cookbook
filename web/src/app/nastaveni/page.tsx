import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/common/Spinner';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

import { SettingsPage } from './SettingsPage';

export const metadata: Metadata = {
  title: 'Nastavení',
};

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<Spinner overlay />}>
        <SettingsContent />
      </Suspense>
    </Layout>
  );
}

async function SettingsContent() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    redirect('/prihlaseni');
  }

  return <SettingsPage />;
}

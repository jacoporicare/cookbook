import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

import { SettingsPage } from './SettingsPage';

export const metadata: Metadata = {
  title: 'Nastavení',
};

export default async function Page() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    redirect('/prihlaseni');
  }

  const { recipes, user } = await getLayoutData({ client, currentUser });

  return <SettingsPage recipes={recipes} user={user} />;
}

import type { Metadata } from 'next';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

import { LoginPage } from './LoginPage';

export const metadata: Metadata = {
  title: 'Přihlášení',
};

type Props = {
  searchParams: Promise<{ redirect_uri?: string; u?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { redirect_uri: redirectUri, u: returnUrl } = await searchParams;

  const client = await getClient();
  const currentUser = await getCurrentUser(client);
  const { recipes } = await getLayoutData({ client, currentUser });

  return (
    <LoginPage
      recipes={recipes}
      redirectUri={redirectUri}
      returnUrl={returnUrl}
    />
  );
}

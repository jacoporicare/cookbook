import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/common/Spinner';

import { LoginPage } from './LoginPage';

export const metadata: Metadata = {
  title: 'Přihlášení',
};

type Props = {
  searchParams: Promise<{ redirect_uri?: string; u?: string }>;
};

export default function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<Spinner overlay />}>
      <LoginRoute searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginRoute({ searchParams }: Props) {
  const { redirect_uri: redirectUri, u: returnUrl } = await searchParams;

  const login = <LoginPage redirectUri={redirectUri} returnUrl={returnUrl} />;

  // WebView login is rendered bare (no site chrome); the regular login sits
  // inside the shared layout.
  if (redirectUri) {
    return login;
  }

  return <Layout>{login}</Layout>;
}

import type { Metadata } from 'next';
import { Suspense } from 'react';

import LoginPage from './LoginPage';

export const metadata: Metadata = {
  title: 'Přihlášení',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}

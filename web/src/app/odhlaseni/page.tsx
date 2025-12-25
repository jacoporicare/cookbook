import { Suspense } from 'react';

import { LogoutPage } from './LogoutPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LogoutPage />
    </Suspense>
  );
}

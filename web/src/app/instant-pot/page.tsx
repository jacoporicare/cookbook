import type { Metadata } from 'next';
import { Suspense } from 'react';

import RecipeListPage from '../RecipeListPage';

export const metadata: Metadata = {
  title: 'Instant Pot recepty',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RecipeListPage />
    </Suspense>
  );
}

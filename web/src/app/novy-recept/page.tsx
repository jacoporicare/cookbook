import type { Metadata } from 'next';
import { Suspense } from 'react';

import RecipeEditPage from './RecipeEditPage';

export const metadata: Metadata = {
  title: 'Nový recept',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RecipeEditPage />
    </Suspense>
  );
}

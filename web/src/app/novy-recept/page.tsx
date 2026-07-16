import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/common/Spinner';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { getCachedRecipeEditOptions } from '@/lib/recipes-cache';

import { RecipeEditPage } from './RecipeEditPage';

export const metadata: Metadata = {
  title: 'Nový recept',
};

export default function Page() {
  return (
    <Layout>
      <Suspense fallback={<Spinner overlay />}>
        <NewRecipeContent />
      </Suspense>
    </Layout>
  );
}

async function NewRecipeContent() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    redirect('/prihlaseni');
  }

  const options = await getCachedRecipeEditOptions();

  return <RecipeEditPage options={options} />;
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Layout } from '@/components/Layout';
import { RecipeAuthorControls } from '@/components/RecipeDetail/RecipeAuthorControls';
import { Spinner } from '@/components/common/Spinner';
import { getCachedRecipe, getCachedRecipeList } from '@/lib/recipes-cache';

import { RecipeDetailPage } from './RecipeDetailPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { recipes } = await getCachedRecipeList();
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getCachedRecipe(slug);

  return {
    title: recipe?.title ?? slug,
  };
}

export default function Page({ params }: Props) {
  return (
    <Layout>
      <Suspense fallback={<Spinner overlay />}>
        <RecipeDetailContent params={params} />
      </Suspense>
    </Layout>
  );
}

async function RecipeDetailContent({ params }: Props) {
  const { slug } = await params;
  const recipe = await getCachedRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <RecipeDetailPage
      recipe={recipe}
      authorControls={
        <Suspense fallback={null}>
          <RecipeAuthorControls
            id={recipe.id}
            slug={recipe.slug}
            title={recipe.title}
            authorUsername={recipe.user?.username ?? undefined}
          />
        </Suspense>
      }
    />
  );
}

import { notFound } from 'next/navigation';

import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';
import { RecipeDetailDocument } from '@/generated/graphql';

import RecipeDetailPage from './RecipeDetailPage';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const client = await getClient();
  const { data } = await client.query({
    query: RecipeDetailDocument,
    variables: { slug },
  });

  return {
    title: data.recipe?.title ?? slug,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [client, user] = await Promise.all([getClient(), getCurrentUser()]);

  const { data } = await client.query({
    query: RecipeDetailDocument,
    variables: { slug },
  });

  if (!data.recipe) {
    notFound();
  }

  const isAuthor = !!user && (user.isAdmin || user.username === data.recipe.user.username);

  return <RecipeDetailPage recipe={data.recipe} isAuthor={isAuthor} />;
}

import { notFound } from 'next/navigation';

import { RecipeDetailDocument } from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

import { RecipeDetailPage } from './RecipeDetailPage';

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
    title: data?.recipe?.title ?? slug,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const client = await getClient();
  const currentUser = await getCurrentUser(client);
  const recipeResult = await client.query({
    query: RecipeDetailDocument,
    variables: { slug },
  });

  if (!recipeResult.data?.recipe) {
    notFound();
  }

  const { recipes, user } = await getLayoutData({ client, currentUser });

  const isAuthor =
    !!currentUser &&
    (currentUser.isAdmin ||
      currentUser.username === recipeResult.data.recipe.user?.username);

  return (
    <RecipeDetailPage
      recipe={recipeResult.data.recipe}
      recipes={recipes}
      currentUser={user}
      isAuthor={isAuthor}
    />
  );
}

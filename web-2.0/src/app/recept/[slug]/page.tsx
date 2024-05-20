import { notFound } from 'next/navigation';

import RecipeDetail from './components/RecipeDetail';

import { getClient } from '@/apollo/client';
import { graphql } from '@/gql';

const recipeDetailQueryDocument = graphql(`
  #graphql
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      ...RecipeDetailItem
    }
  }
`);

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const { data } = await getClient().query({
    query: recipeDetailQueryDocument,
    variables: { slug: params.slug },
  });

  if (!data.recipe) {
    notFound();
  }

  return <RecipeDetail recipe={data.recipe} />;
}

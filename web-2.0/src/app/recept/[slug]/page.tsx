import { notFound } from 'next/navigation';

import RecipeDetail from './components/RecipeDetail';

import { graphql } from '@/gql';
import { client } from '@/graphql';

const recipeDetailQueryDocument = graphql(`
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      ...RecipeDetailItem
    }
    me {
      ...RecipeDetailUser
    }
  }
`);

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const data = await client.request(recipeDetailQueryDocument, { slug: params.slug });

  if (!data.recipe) {
    notFound();
  }

  return <RecipeDetail recipe={data.recipe} user={data.me} />;
}

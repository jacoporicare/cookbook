import RecipeList from './home/components/RecipeList';

import { getClient } from '@/apollo/client';
import { graphql } from '@/gql';

const recipeListQueryDocument = graphql(`
  #graphql
  query RecipeList {
    recipes {
      id
      ...RecipeItem
    }
    tags
  }
`);

export default async function Home() {
  const { data } = await getClient().query({ query: recipeListQueryDocument });

  return <RecipeList recipes={data.recipes} />;
}

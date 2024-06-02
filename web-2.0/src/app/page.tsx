import RecipeList from './home/components/RecipeList';

import { graphql } from '@/gql';
import { client } from '@/graphql';

const recipeListQueryDocument = graphql(`
  query RecipeList {
    recipes {
      id
      ...RecipeItem
    }
  }
`);

export default async function Home() {
  const data = await client.request(recipeListQueryDocument);

  return <RecipeList recipes={data.recipes} />;
}

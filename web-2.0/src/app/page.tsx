import { Grid } from '@mui/material';

import RecipeListItem from './RecipeListItem';

import { getClient } from '@/apollo/client';
import { graphql } from '@/gql';

const recipeListQueryDocument = graphql(`
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

  return (
    <main>
      <Grid spacing={2} container>
        {data.recipes.map(recipe => (
          <Grid key={recipe.id} component="article" lg={3} md={4} sm={6} xl={2} xs={12} item>
            <RecipeListItem recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

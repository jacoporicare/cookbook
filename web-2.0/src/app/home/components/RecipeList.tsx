import { Grid } from '@mui/material';

import RecipeListItem from './RecipeListItem';

import { RecipeListQuery } from '@/gql/graphql';

type Props = {
  recipes: RecipeListQuery['recipes'];
};

export default async function RecipeList(props: Props) {
  return (
    <main>
      <Grid spacing={2} container>
        {props.recipes.map(recipe => (
          <Grid key={recipe.id} component="article" lg={3} md={4} sm={6} xl={2} xs={12} item>
            <RecipeListItem recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

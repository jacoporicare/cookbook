import { Grid } from '@material-ui/core';
import React from 'react';

import { RecipeBaseFragment } from '../../generated/graphql';

import RecipeListItem from './RecipeListItem';

type Props = {
  recipes: RecipeBaseFragment[];
};

function RecipeList({ recipes }: Props) {
  return (
    <Grid spacing={2} container>
      {recipes.map(recipe => (
        <Grid key={recipe.slug} component="article" lg={3} md={4} sm={6} xl={2} xs={12} item>
          <RecipeListItem recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;

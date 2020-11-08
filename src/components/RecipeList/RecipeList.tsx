import { Grid } from '@material-ui/core';
import React from 'react';

import { RecipeBaseFragment } from '../../generated/graphql';

import RecipeListItem from './RecipeListItem';

type Props = {
  recipes: RecipeBaseFragment[];
  loggedInUser?: {
    username: string;
    isAdmin: boolean;
  };
};

function RecipeList({ recipes, loggedInUser }: Props) {
  return (
    <Grid spacing={2} container>
      {recipes.map(recipe => (
        <Grid key={recipe.slug} component="article" lg={3} md={4} sm={6} xs={12} item>
          <RecipeListItem
            isAuthor={Boolean(
              loggedInUser &&
                (loggedInUser.username === recipe.user.username || loggedInUser.isAdmin),
            )}
            recipe={recipe}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;

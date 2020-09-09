import React from 'react';

import { RecipeBaseFragment } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import { Box, BoxArticle } from '../core';

import RecipeListItem from './RecipeListItem';

type Props = {
  recipes: RecipeBaseFragment[];
};

const widths = ['100%', '50%', '33.33333%', '25%', '20%'];
const border = `1px solid ${colors.gray200}`;

function RecipeList({ recipes }: Props) {
  return (
    <Box
      borderLeft={[0, border]}
      borderTop={[0, border]}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
    >
      {recipes.map(recipe => (
        <BoxArticle
          key={recipe.slug}
          borderBottom={border}
          borderLeft={[border, 0]}
          borderRight={border}
          borderTop={[border, 0]}
          flex="auto"
          maxWidth={widths}
          mb={[3, 0]}
          width={widths}
        >
          <RecipeListItem recipe={recipe} />
        </BoxArticle>
      ))}
    </Box>
  );
}

export default RecipeList;

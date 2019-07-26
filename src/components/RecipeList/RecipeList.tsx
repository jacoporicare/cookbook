import React from 'react';

import { Recipe } from '../../types';
import { colors } from '../../styles/colors';
import { BoxArticle, Box } from '../core';
import RecipeListItem from './RecipeListItem';

type Props = {
  recipes: Recipe[];
};

const widths = ['100%', '50%', '33.33333%', '25%'];
const border = `1px solid ${colors.gray200}`;

function RecipeList({ recipes }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      flexWrap="wrap"
      borderTop={[0, border]}
      borderLeft={[0, border]}
    >
      {recipes
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title, 'cs'))
        .map(recipe => (
          <BoxArticle
            key={recipe._id}
            flex="auto"
            width={widths}
            maxWidth={widths}
            mb={[3, 0]}
            borderTop={[border, 0]}
            borderLeft={[border, 0]}
            borderRight={border}
            borderBottom={border}
          >
            <RecipeListItem recipe={recipe} />
          </BoxArticle>
        ))}
    </Box>
  );
}

export default RecipeList;

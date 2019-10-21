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
      borderLeft={[0, border]}
      borderTop={[0, border]}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
    >
      {recipes
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title, 'cs'))
        .map(recipe => (
          <BoxArticle
            key={recipe._id}
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

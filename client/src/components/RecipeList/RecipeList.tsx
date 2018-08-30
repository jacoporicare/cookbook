import React from 'react';

import { Recipe } from '../../types';
import { colors } from '../../styles/colors';
import { InfoAlert } from '../elements/Alert';
import { Box } from '../core';
import { RecipeListItem } from './RecipeListItem';

type Props = {
  recipes: Recipe[];
};

const widths = ['100%', '50%', '33.33333%', '25%'];
const border = `1px solid ${colors.gray200}`;

export const RecipeList = ({ recipes }: Props) => (
  <Box
    display="flex"
    justifyContent="space-between"
    flexWrap="wrap"
    borderTop={[0, border]}
    borderLeft={[0, border]}
  >
    {recipes.map(recipe => (
      <Box
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
      </Box>
    ))}
    {recipes.length === 0 && <InfoAlert>Zatím zde není žádný recept.</InfoAlert>}
  </Box>
);

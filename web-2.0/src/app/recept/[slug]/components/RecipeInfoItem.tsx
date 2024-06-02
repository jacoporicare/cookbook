'use client';

import { styled } from '@mui/material';

const RecipeInfoItem = styled('li')({
  display: 'inline-block',
  '& + &': {
    marginLeft: '4px',
  },
  '& + &::before': {
    display: 'inline-block',
    content: "'·'",
    marginRight: '4px',
  },
});

export default RecipeInfoItem;

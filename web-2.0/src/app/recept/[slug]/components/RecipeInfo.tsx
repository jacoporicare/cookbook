import { Box, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

import RecipeInfoItem from './RecipeInfoItem';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: ReactNode;
  small?: boolean;
};

function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0 && minutes === 0) {
    return `${hours} h`;
  }

  if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${minutes} min`;
}

export default function RecipeInfo({ preparationTime, sideDish, placeholder, small }: Props) {
  if (!preparationTime && !sideDish) {
    return placeholder ? (
      <Typography color="textSecondary" variant="body1">
        {placeholder}
      </Typography>
    ) : null;
  }

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}
    >
      {!!preparationTime && preparationTime > 0 && (
        <RecipeInfoItem>
          {!small && (
            <Typography color="textSecondary" component="span" variant="body1">
              Doba přípravy{' '}
            </Typography>
          )}
          <Typography
            color={small ? 'textSecondary' : undefined}
            component="span"
            variant={small ? 'body2' : 'body1'}
          >
            {formatTime(preparationTime)}
          </Typography>{' '}
        </RecipeInfoItem>
      )}
      {!!sideDish && (
        <RecipeInfoItem>
          {!small && (
            <Typography color="textSecondary" component="span" variant="body1">
              Příloha{' '}
            </Typography>
          )}
          <Typography
            color={small ? 'textSecondary' : undefined}
            component="span"
            variant={small ? 'body2' : 'body1'}
          >
            {sideDish}
          </Typography>
        </RecipeInfoItem>
      )}
    </Box>
  );
}
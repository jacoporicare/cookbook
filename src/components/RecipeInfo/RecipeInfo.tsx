import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: React.ReactNode;
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

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    display: 'inline-block',
    '& + &': {
      marginLeft: '4px',
    },
    '& + &::before': {
      display: 'inline-block',
      content: "'·'",
      marginRight: '4px',
    },
  },
});

function RecipeInfo({ preparationTime, sideDish, placeholder, small }: Props) {
  const classes = useStyles();

  if (!preparationTime && !sideDish) {
    return placeholder ? (
      <Typography color="textSecondary" variant="body1">
        {placeholder}
      </Typography>
    ) : null;
  }

  return (
    <ul className={classes.root}>
      {!!preparationTime && preparationTime > 0 && (
        <li className={classes.item}>
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
        </li>
      )}
      {!!sideDish && (
        <li className={classes.item}>
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
        </li>
      )}
    </ul>
  );
}

export default RecipeInfo;

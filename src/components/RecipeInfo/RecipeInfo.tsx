import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  preparationTime: number | null;
  sideDish: string | null;
  placeholder?: React.ReactNode;
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

function RecipeInfo({ preparationTime, sideDish, placeholder }: Props) {
  const classes = useStyles();

  if (!preparationTime && !sideDish) {
    return placeholder ? <div>{placeholder}</div> : null;
  }

  return (
    <ul className={classes.root}>
      {!!preparationTime && preparationTime > 0 && (
        <li className={classes.item}>
          <Typography color="textSecondary" component="span">
            Doba přípravy
          </Typography>{' '}
          <Typography component="span">{formatTime(preparationTime)}</Typography>{' '}
        </li>
      )}
      {!!sideDish && (
        <li className={classes.item}>
          <Typography color="textSecondary" component="span">
            Příloha
          </Typography>{' '}
          <Typography component="span">{sideDish}</Typography>
        </li>
      )}
    </ul>
  );
}

export default RecipeInfo;

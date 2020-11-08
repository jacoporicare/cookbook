import { createStyles, makeStyles, Theme } from '@material-ui/core';
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

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    item: {
      display: 'inline',
      '& + &::before': {
        content: "' · '",
      },
    },
  }),
);

function RecipeInfo({ preparationTime, sideDish, placeholder }: Props) {
  const classes = useStyles();

  if (!preparationTime && !sideDish) {
    return placeholder ? <div>{placeholder}</div> : null;
  }

  return (
    <ul className={classes.root}>
      {!!preparationTime && preparationTime > 0 && (
        <li className={classes.item}>{formatTime(preparationTime)}</li>
      )}
      {!!sideDish && <li className={classes.item}>{sideDish}</li>}
    </ul>
  );
}

export default RecipeInfo;

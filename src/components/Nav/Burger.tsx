import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  input: {
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    display: 'none',

    '&:checked': {
      '& ~ nav': {
        transform: 'translateX(0)',
        boxShadow: 'rgba(0, 0, 0, 0.25) -16px 0 32px',
      },
      '& ~ label': {
        '& > $part1': {
          transform: 'rotate(135deg)',
          marginTop: '7px',
        },
        '& > $part2': {
          opacity: 0,
        },
        '& > $part3': {
          transform: 'rotate(-135deg)',
          marginTop: '-9px',
        },
      },
    },
  },
  label: {
    flexShrink: 0,
    display: 'block',
    cursor: 'pointer',
    height: '22px',
    width: '22px',
    marginTop: '8px',
    marginLeft: '8px',
    transition: 'all 0.3s',

    '& > div': {
      height: '3px',
      width: '100%',
      backgroundColor: '#fff',
      transition: 'all 0.3s',
    },
  },
  part1: {},
  part2: {
    marginTop: '3px',
  },
  part3: {
    marginTop: '3px',
  },

  '@media (min-width: 1024px)': {
    label: {
      display: 'none',
    },
  },
});

function Burger() {
  const classes = useStyles();

  return (
    <>
      <input className={classes.input} id="openSidebarMenu" type="checkbox" />
      <label className={classes.label} htmlFor="openSidebarMenu">
        <div className={classes.part1} />
        <div className={classes.part2} />
        <div className={classes.part3} />
      </label>
    </>
  );
}

export default Burger;

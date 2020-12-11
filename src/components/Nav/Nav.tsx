import { makeStyles } from '@material-ui/core';
import React from 'react';

import { colors } from '../../styles/colors';
import UserInfo from '../UserInfo';

import Burger from './Burger';
import NavLink from './NavLink';

type Props = {
  showUserInfo?: boolean;
};

const useStyles = makeStyles({
  nav: {},

  '@media (max-width: 1023px)': {
    nav: {
      position: 'fixed',
      top: '58px',
      right: 0,
      width: '250px',
      height: '100%',
      transform: 'translateX(250px)',
      transition: 'transform 250ms ease-in-out',
      background: colors.gray900,
    },
  },
  '@media (min-width: 1024px)': {
    nav: {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

function Nav(props: Props) {
  const classes = useStyles();

  return (
    <>
      <Burger />
      <nav className={classes.nav}>
        <NavLink href="/">Recepty</NavLink>
        <NavLink href="/prilohy">Přílohy</NavLink>
        {props.showUserInfo && <UserInfo />}
      </nav>
    </>
  );
}

export default Nav;

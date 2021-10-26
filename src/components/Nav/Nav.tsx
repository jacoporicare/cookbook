import { Box } from '@mui/material';
import React from 'react';

import { colors } from '../../styles/colors';
import UserInfo from '../UserInfo';

import Burger from './Burger';
import NavLink from './NavLink';

type Props = {
  showUserInfo?: boolean;
};

function Nav(props: Props) {
  return (
    <>
      <Burger />
      <Box
        component="nav"
        sx={{
          '@media (max-width: 1023px)': {
            position: 'fixed',
            top: '57px',
            right: 0,
            width: '250px',
            height: '100%',
            transform: 'translateX(250px)',
            transition: 'transform 250ms ease-in-out',
            background: colors.gray900,
          },
          '@media (min-width: 1024px)': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <NavLink href="/">Recepty</NavLink>
        <NavLink href="/prilohy">Přílohy</NavLink>
        {props.showUserInfo && <UserInfo />}
      </Box>
    </>
  );
}

export default Nav;

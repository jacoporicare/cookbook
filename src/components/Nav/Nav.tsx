import React from 'react';

import UserInfo from '../UserInfo';
import { BoxNav } from '../core';

import NavLink from './NavLink';

type Props = {
  showUserInfo?: boolean;
};

function Nav(props: Props) {
  return (
    <BoxNav display="flex">
      <NavLink href="/">Recepty</NavLink>
      <NavLink href="/prilohy">Přílohy</NavLink>
      {props.showUserInfo && <UserInfo />}
    </BoxNav>
  );
}

export default Nav;

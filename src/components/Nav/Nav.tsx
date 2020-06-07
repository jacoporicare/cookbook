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
      <nav>
        <NavLink href="/">Recepty</NavLink>
        <NavLink href="/prilohy">Přílohy</NavLink>
        {props.showUserInfo && <UserInfo />}
      </nav>
      <style jsx>{`
        @media (max-width: 1023px) {
          nav {
            position: fixed;
            top: 58px;
            right: 0;
            width: 250px;
            height: 100%;
            transform: translateX(250px);
            transition: transform 250ms ease-in-out;
            background: ${colors.gray1000};
          }
        }

        @media (min-width: 1024px) {
          nav {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default Nav;

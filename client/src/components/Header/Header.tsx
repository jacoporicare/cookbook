import React from 'react';
import { IndexLink } from 'react-router';

import UserInfo from './UserInfo';
import pig from './pig.png';
import cow from './cow.png';

import './Header.module.css';

interface Props {
  userName?: string;
  isAuthenticated: boolean;
  isFetchingUser: boolean;
}

const Header = ({ userName, isAuthenticated, isFetchingUser }: Props) => (
  <div className="container">
    <div styleName="header">
      <h1 styleName="logo">
        <IndexLink to="/">
          <img src={pig} alt="Prase" styleName="icon" /> Žrádelník{' '}
          <img src={cow} alt="Kráva" styleName="icon" />
        </IndexLink>
      </h1>
      {isAuthenticated && (
        <div styleName="user-info">
          <UserInfo userName={userName} isFetchingUser={isFetchingUser} />
        </div>
      )}
    </div>
  </div>
);

export default Header;

import React from 'react';
import { Link } from 'react-router';

import './UserInfo.module.css';

interface Props {
  userName?: string;
  isFetchingUser: boolean;
}

const UserInfo = ({ userName, isFetchingUser }: Props) => (
  <div>
    {isFetchingUser ? (
      <i className="fa fa-spin fa-spinner" />
    ) : (
      <span>
        <i className="fa fa-user" /> {userName}
      </span>
    )}
    <Link to="/odhlaseni" styleName="sign-out">
      Odhlásit
    </Link>
  </div>
);

export default UserInfo;

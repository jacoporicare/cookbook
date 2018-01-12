import React from 'react';
import { Link } from 'react-router';

import './UserInfo.module.css';

interface Props {
  userName?: string;
  isFetchingUser: boolean;
}

const UserInfo = ({ userName, isFetchingUser }: Props) => (
  <>
    {isFetchingUser ? (
      <i className="fa fa-spin fa-spinner" />
    ) : (
      <>
        <i className="fa fa-user" /> {userName}
      </>
    )}
    <Link to="/odhlaseni" styleName="sign-out">
      Odhlásit
    </Link>
  </>
);

export default UserInfo;

import React from 'react';
import { Link } from 'react-router';

import './UserInfo.module.css';

interface Props {
  isAuthenticated: boolean;
  userName?: string;
  isFetchingUser: boolean;
}

const UserInfo = ({ isAuthenticated, userName, isFetchingUser }: Props) => {
  const backUrl = encodeURIComponent(window.location.pathname);

  if (!isAuthenticated) {
    return <Link to={`/prihlaseni?u=${backUrl}`}>Přihlásit</Link>;
  }

  return (
    <>
      {isFetchingUser ? (
        <i className="fa fa-spin fa-spinner" />
      ) : (
        <>
          <i className="fa fa-user" /> {userName}
        </>
      )}
      <Link to={`/odhlaseni?u=${backUrl}`} styleName="sign-out">
        Odhlásit
      </Link>
    </>
  );
};

export default UserInfo;

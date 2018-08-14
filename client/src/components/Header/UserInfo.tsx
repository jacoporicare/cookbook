import React from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';
import { Icon } from '../Icon/Icon';

type Props = {
  isAuthenticated: boolean;
  userName?: string;
  isFetchingUser: boolean;
};

export const UserInfo = ({ isAuthenticated, userName, isFetchingUser }: Props) => {
  const backUrl = encodeURIComponent(window.location.pathname);

  if (!isAuthenticated) {
    return <Link to={`/prihlaseni?u=${backUrl}`}>Přihlásit</Link>;
  }

  return (
    <>
      {isFetchingUser ? (
        <Icon icon="spinner" spin />
      ) : (
        <>
          <Icon icon="user" /> {userName}
        </>
      )}
      <Link
        to={`/odhlaseni?u=${backUrl}`}
        className={css`
          display: inline-block;
          margin-left: 10px;
        `}
      >
        Odhlásit
      </Link>
    </>
  );
};

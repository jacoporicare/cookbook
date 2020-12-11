import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '../../AuthContext';
import { colors } from '../../styles/colors';
import NavLink from '../Nav/NavLink';
import Icon from '../common/Icon';

type Props = {
  userName?: string;
  isUserLoading?: boolean;
  isUserAdmin?: boolean;
};

const useStyles = makeStyles({
  navItem: {
    color: colors.gray600,
    fontSize: '20px',
    fontWeight: 300,
    padding: '4px 8px',
    whiteSpace: 'nowrap',
  },
  divider: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  signOut: {},
  '@media (max-width: 1023px)': {
    divider: {
      borderTop: `1px solid ${colors.gray600}`,
      height: 0,
      overflow: 'hidden',
    },
  },
  '@media (min-width: 1024px)': {
    navItem: {
      padding: '8px',
    },
    divider: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    signOut: {
      display: 'none',
    },
  },
});

function UserInfo(props: Props) {
  const classes = useStyles();

  const [token] = useAuth();
  const router = useRouter();

  return (
    <>
      {props.isUserAdmin && <NavLink href="/admin">Admin</NavLink>}
      <div className={classNames(classes.navItem, classes.divider)}>·</div>
      {!token ? (
        <NavLink
          activeHref="/prihlaseni"
          href={
            !router.asPath || router.asPath.startsWith('/prihlaseni')
              ? '/prihlaseni'
              : `/prihlaseni?u=${router.asPath || ''}`
          }
        >
          Přihlásit
        </NavLink>
      ) : (
        <>
          {props.isUserLoading ? (
            <div className={classes.navItem}>
              <Icon icon="spinner" spin />
            </div>
          ) : (
            <NavLink href="/nastaveni">{props.userName}</NavLink>
          )}
          <NavLink href={`/odhlaseni?u=${router.asPath || ''}`}>
            <Icon icon="sign-out-alt" /> <span className={classes.signOut}>Odhlásit</span>
          </NavLink>
        </>
      )}
    </>
  );
}

export default UserInfo;

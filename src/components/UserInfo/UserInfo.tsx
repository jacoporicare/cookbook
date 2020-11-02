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

function UserInfo(props: Props) {
  const [token] = useAuth();
  const router = useRouter();

  return (
    <>
      {props.isUserAdmin && <NavLink href="/admin">Admin</NavLink>}
      <div className="nav-item divider">·</div>
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
            <div className="nav-item">
              <Icon icon="spinner" spin />
            </div>
          ) : (
            <NavLink href="/nastaveni">{props.userName}</NavLink>
          )}
          <NavLink href={`/odhlaseni?u=${router.asPath || ''}`}>
            <Icon icon="sign-out-alt" /> <span className="sign-out">Odhlásit</span>
          </NavLink>
        </>
      )}
      <style jsx>{`
        .nav-item {
          color: ${colors.gray600};
          font-size: 20px;
          font-weight: 300;
          padding: 4px 8px;
          white-space: nowrap;
        }

        .nav-item.divider {
          padding-left: 0;
          padding-right: 0;
        }

        @media (max-width: 1023px) {
          .nav-item.divider {
            border-top: 1px solid ${colors.gray600};
            height: 0;
            overflow: hidden;
          }
        }

        @media (min-width: 1024px) {
          .nav-item {
            padding: 8px;
          }

          .sign-out {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default UserInfo;
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from '../../AuthContext';
import { RecipeBaseFragment } from '../../generated/graphql';
import { colors, theme } from '../../styles/colors';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import Icon from '../common/Icon';
import { Box, BoxHeader, BoxNav } from '../core';

import cow from './cow.png';
import pig from './pig.png';

type Props = {
  userName?: string;
  isUserLoading?: boolean;
  isUserAdmin?: boolean;
  onRecipeSelected?: (slug: string) => void;
  recipes?: RecipeBaseFragment[];
  hideUserInfo?: boolean;
};

function Header(props: Props) {
  const [token] = useAuth();
  const router = useRouter();

  return (
    <>
      <BoxHeader
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          color: 'white',
          backgroundColor: colors.gray1000,
          boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          overflow={['auto', 'initial']}
          px={[3, 4]}
          py={1}
        >
          <Box alignItems="center" display="flex">
            <Link href="/">
              <a className="logo">
                <img alt="Prase" className="icon" src={pig} />{' '}
                <Box display={['none', 'inline']}>Žrádelník</Box>{' '}
                <img alt="Kráva" className="icon" src={cow} />
              </a>
            </Link>
          </Box>
          <BoxNav display="flex">
            {props.recipes && props.onRecipeSelected && (
              <RecipeSearch recipes={props.recipes} onSelected={props.onRecipeSelected} />
            )}
            <Link href="/">
              <a
                className={classNames('nav-item link', {
                  active: router.pathname === '/',
                })}
              >
                Recepty
              </a>
            </Link>
            <Link href="/prilohy">
              <a
                className={classNames('nav-item link', {
                  active: router.pathname === '/prilohy',
                })}
              >
                Přílohy
              </a>
            </Link>
            {props.isUserAdmin && (
              <Link href="/admin">
                <a
                  className={classNames('nav-item link', {
                    active: router.pathname === '/admin',
                  })}
                >
                  Admin
                </a>
              </Link>
            )}
            {!props.hideUserInfo && <div className="nav-item divider">·</div>}
            {!props.hideUserInfo && !token && (
              <Link
                href={
                  !router.asPath || router.asPath.startsWith('/prihlaseni')
                    ? '/prihlaseni'
                    : `/prihlaseni?u=${router.asPath || ''}`
                }
              >
                <a
                  className={classNames('nav-item link', {
                    active: router.pathname === '/prihlaseni',
                  })}
                >
                  Přihlásit
                </a>
              </Link>
            )}
            {!props.hideUserInfo && token && (
              <>
                {props.isUserLoading ? (
                  <div className="nav-item">
                    <Icon icon="spinner" spin />
                  </div>
                ) : (
                  <Link href="/nastaveni">
                    <a
                      className={classNames('nav-item link', {
                        active: router.pathname === '/nastaveni',
                      })}
                    >
                      {props.userName}
                    </a>
                  </Link>
                )}
                <Link href={`/odhlaseni?u=${router.asPath || ''}`}>
                  <a className="nav-item link">
                    <Icon icon="sign-out-alt" />
                  </a>
                </Link>
              </>
            )}
          </BoxNav>
        </Box>
      </BoxHeader>
      <style jsx>{`
        .logo {
          display: flex;
          align-items: center;
          font-family: 'Amatic SC', cursive;
          font-size: 36px;
          color: white;
        }

        .logo:hover {
          color: white;
          text-decoration: none;
        }

        .icon {
          width: 40px;
          height: 40px;
          margin: 0 4px;
        }

        .nav-item {
          color: ${colors.gray600};
          font-size: 20px;
          font-weight: 300;
          padding: 8px;
          white-space: nowrap;
        }

        .nav-item.divider {
          padding-left: 0;
          padding-right: 0;
        }

        .link {
          color: white;
          text-decoration: none;
        }

        .link::after {
          content: '';
          display: block;
          width: 100%;
          margin-top: 4px;
          height: 4px;
          transition: transform 250ms ease;
          transform: scaleX(0);
          background-color: ${theme.primary};
        }

        .link:hover::after {
          transform: scaleX(1);
        }

        .link:hover {
          color: white;
          text-decoration: none;
        }

        .link.active::after {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
}

export default Header;

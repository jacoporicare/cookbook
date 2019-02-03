import React from 'react';
import { Link, LinkGetProps } from '@reach/router';
import styled, { css, cx } from 'react-emotion';

import { Recipe } from '../../types';
import { colors, theme } from '../../styles/colors';
import { Box } from '../core';
import Icon from '../common/Icon';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import cow from './cow.png';
import pig from './pig.png';

type Props = {
  userName?: string;
  isAuthenticated: boolean;
  isFetchingUser: boolean;
  recipes: Recipe[];
  onRecipeSelected: (slug: string) => void;
};

const LogoIcon = styled('img')`
  width: 40px;
  height: 40px;
  margin: 0 4px;
`;

const navItem = css`
  color: ${colors.gray600};
  font-size: 20px;
  font-weight: 300;
  padding: 8px;
  white-space: nowrap;
`;

const NavItem = styled(Box)(navItem);

const animatedUnderline = css`
  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 4px;
    height: 4px;
    transition: transform 250ms ease;
    transform: scaleX(0);
    background-color: ${theme.primary};
  }
  &.active::after,
  &:hover::after {
    transform: scaleX(1);
  }
`;

const linkStyle = css(
  navItem,
  css`
    color: white;
    text-decoration: none;
    ${animatedUnderline};

    &:hover {
      color: white;
      text-decoration: none;
    }
  `,
);

function getLinkProps({ isCurrent }: LinkGetProps) {
  return {
    className: cx(linkStyle, { active: isCurrent }),
  };
}

function Header({ userName, isAuthenticated, isFetchingUser, recipes, onRecipeSelected }: Props) {
  return (
    <Box
      bg={colors.gray1000}
      color="white"
      className={css({
        transition: 'all 200ms ease',
      })}
    >
      <Box display="flex" justifyContent="space-between" p={[2, 3]} overflow={['auto', 'initial']}>
        <Box
          display="flex"
          alignItems="center"
          className={css({ transition: 'opacity 200ms ease' })}
        >
          <Link
            to="/"
            className={css`
              display: flex;
              align-items: center;
              font-family: 'Amatic SC', cursive;
              font-size: 36px;
              color: white;

              &:hover {
                color: white;
                text-decoration: none;
              }
            `}
          >
            <LogoIcon src={pig} alt="Prase" /> <Box display={['none', 'inline']}>Žrádelník</Box>{' '}
            <LogoIcon src={cow} alt="Kráva" />
          </Link>
        </Box>
        <Box display="flex">
          <RecipeSearch recipes={recipes} onSelected={onRecipeSelected} />
          <Link to="/" getProps={getLinkProps}>
            Recepty
          </Link>
          <Link to="/prilohy" getProps={getLinkProps}>
            Přílohy
          </Link>
          {navigator.onLine && (
            <>
              <NavItem className={css({ paddingLeft: 0, paddingRight: 0 })}>·</NavItem>
              {!isAuthenticated ? (
                <Link
                  to={`/prihlaseni#u=${encodeURIComponent(window.location.pathname)}`}
                  getProps={getLinkProps}
                >
                  Přihlásit
                </Link>
              ) : (
                <>
                  <NavItem>{isFetchingUser ? <Icon icon="spinner" spin /> : userName}</NavItem>
                  <Link
                    to={`/odhlaseni?u=${encodeURIComponent(window.location.pathname)}`}
                    getProps={getLinkProps}
                  >
                    <Icon icon="sign-out-alt" />
                  </Link>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;

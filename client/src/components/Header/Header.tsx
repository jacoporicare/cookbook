import React from 'react';
import { IndexLink, Link } from 'react-router';
import styled, { css } from 'react-emotion';

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

const LogoIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 4px;
`;

const NavItem = styled(Box)`
  color: ${colors.gray600};
  font-size: 20px;
  font-weight: 300;
  padding: 8px;
  white-space: nowrap;
`;

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

const StyledLink = styled(NavItem)`
  color: white;
  text-decoration: none;
  ${animatedUnderline};

  &:hover {
    color: white;
    text-decoration: none;
  }
`.withComponent(Link);

const StyledIndexLink = StyledLink.withComponent(IndexLink);

export default function Header({
  userName,
  isAuthenticated,
  isFetchingUser,
  recipes,
  onRecipeSelected,
}: Props) {
  return (
    <Box
      bg={colors.gray1000}
      color="white"
      css={{
        transition: 'all 200ms ease',
      }}
    >
      <Box display="flex" justifyContent="space-between" p={[2, 3]} overflow={['auto', 'initial']}>
        <Box display="flex" alignItems="center" css={{ transition: 'opacity 200ms ease' }}>
          <IndexLink
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
          </IndexLink>
        </Box>
        <Box display="flex">
          <RecipeSearch recipes={recipes} onSelected={onRecipeSelected} />
          <StyledIndexLink to="/" activeClassName="active">
            Recepty
          </StyledIndexLink>
          <StyledLink to="/prilohy" activeClassName="active">
            Přílohy
          </StyledLink>
          <NavItem css={{ paddingLeft: 0, paddingRight: 0 }}>·</NavItem>
          {!isAuthenticated ? (
            <StyledLink
              to={`/prihlaseni#u=${encodeURIComponent(window.location.pathname)}`}
              activeClassName="active"
            >
              Přihlásit
            </StyledLink>
          ) : (
            <>
              <NavItem>{isFetchingUser ? <Icon icon="spinner" spin /> : userName}</NavItem>
              <StyledLink to={`/odhlaseni?u=${encodeURIComponent(window.location.pathname)}`}>
                <Icon icon="sign-out-alt" />
              </StyledLink>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

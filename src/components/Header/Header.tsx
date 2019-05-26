import { Link, LinkGetProps } from '@reach/router';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled, { css, cx } from 'react-emotion';

import { useAuth } from '../../AuthContext';
import { RecipeListQueryData, RECIPE_LIST_QUERY } from '../../pages/RecipeListPage';
import { colors, theme } from '../../styles/colors';
import { isOnline } from '../../utils';
import Icon from '../common/Icon';
import { Box } from '../core';
import RecipeSearch from '../RecipeSearch/RecipeSearch';
import cow from './cow.png';
import pig from './pig.png';

type Props = {
  userName?: string;
  isUserLoading: boolean;
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

function Header(props: Props) {
  const [token] = useAuth();
  const { data } = useQuery<RecipeListQueryData>(RECIPE_LIST_QUERY);

  const recipes = (data && data.recipes) || [];

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
          <RecipeSearch recipes={recipes} onSelected={props.onRecipeSelected} />
          <Link to="/" getProps={getLinkProps}>
            Recepty
          </Link>
          <Link to="/prilohy" getProps={getLinkProps}>
            Přílohy
          </Link>
          {isOnline() && (
            <>
              <NavItem className={css({ paddingLeft: 0, paddingRight: 0 })}>·</NavItem>
              {!token ? (
                <Link to="/prihlaseni" getProps={getLinkProps}>
                  Přihlásit
                </Link>
              ) : (
                <>
                  <NavItem>
                    {props.isUserLoading ? <Icon icon="spinner" spin /> : props.userName}
                  </NavItem>
                  <Link to="/odhlaseni" getProps={getLinkProps}>
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

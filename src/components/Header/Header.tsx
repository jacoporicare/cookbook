import { Link, LinkGetProps } from '@reach/router';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import { ClassNames } from '@emotion/core';

import { useAuth } from '../../AuthContext';
import { RecipeListQueryData, RECIPE_LIST_QUERY } from '../../pages/RecipeListPage';
import { colors, theme } from '../../styles/colors';
import { isOnline } from '../../utils';
import Icon from '../common/Icon';
import { Box, BoxHeader, BoxNav } from '../core';
import RecipeSearch from '../RecipeSearch/RecipeSearch';

import cow from './cow.png';
import pig from './pig.png';

type Props = {
  userName?: string;
  isUserLoading: boolean;
  isUserAdmin?: boolean;
  onRecipeSelected: (slug: string) => void;
  pathname?: string;
};

const LogoIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 4px;
`;

const NavItem = styled(Box)({
  color: colors.gray600,
  fontSize: '20px',
  fontWeight: 300,
  padding: '8px',
  whiteSpace: 'nowrap',
});

function Header(props: Props) {
  const [token] = useAuth();
  const { data } = useQuery<RecipeListQueryData>(RECIPE_LIST_QUERY);

  const recipes = (data && data.recipes) || [];

  return (
    <ClassNames>
      {({ css }) => {
        const linkStyle = css({
          fontSize: '20px',
          fontWeight: 300,
          padding: '8px',
          whiteSpace: 'nowrap',
          color: 'white',
          textDecoration: 'none',

          '&::after': {
            content: '""',
            display: 'block',
            width: '100%',
            marginTop: '4px',
            height: '4px',
            transition: 'transform 250ms ease',
            transform: 'scaleX(0)',
            backgroundColor: theme.primary,
          },

          '&:hover::after': {
            transform: 'scaleX(1)',
          },

          '&:hover': {
            color: 'white',
            textDecoration: 'none',
          },
        });

        const activeStyle = css(linkStyle, {
          '&::after': {
            transform: 'scaleX(1)',
          },
        });

        function getLinkProps({ isCurrent }: LinkGetProps) {
          return {
            className: isCurrent ? activeStyle : linkStyle,
          };
        }

        return (
          <BoxHeader
            bg={colors.gray1000}
            color="white"
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
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
                <Link
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
                  to="/"
                >
                  <LogoIcon alt="Prase" src={pig} />{' '}
                  <Box display={['none', 'inline']}>Žrádelník</Box>{' '}
                  <LogoIcon alt="Kráva" src={cow} />
                </Link>
              </Box>
              <BoxNav display="flex">
                <RecipeSearch recipes={recipes} onSelected={props.onRecipeSelected} />
                <Link getProps={getLinkProps} to="/">
                  Recepty
                </Link>
                <Link getProps={getLinkProps} to="/prilohy">
                  Přílohy
                </Link>
                {props.isUserAdmin && (
                  <Link getProps={getLinkProps} to="/admin">
                    Admin
                  </Link>
                )}
                {isOnline() && (
                  <>
                    <NavItem css={{ paddingLeft: 0, paddingRight: 0 }}>·</NavItem>
                    {!token ? (
                      <Link
                        getProps={getLinkProps}
                        to={
                          !props.pathname || props.pathname.startsWith('/prihlaseni')
                            ? '/prihlaseni'
                            : `/prihlaseni?u=${props.pathname || ''}`
                        }
                      >
                        Přihlásit
                      </Link>
                    ) : (
                      <>
                        {props.isUserLoading ? (
                          <NavItem>
                            <Icon icon="spinner" spin />
                          </NavItem>
                        ) : (
                          <Link getProps={getLinkProps} to="/nastaveni">
                            {props.userName}
                          </Link>
                        )}
                        <Link getProps={getLinkProps} to={`/odhlaseni?u=${props.pathname || ''}`}>
                          <Icon icon="sign-out-alt" />
                        </Link>
                      </>
                    )}
                  </>
                )}
              </BoxNav>
            </Box>
          </BoxHeader>
        );
      }}
    </ClassNames>
  );
}

export default Header;

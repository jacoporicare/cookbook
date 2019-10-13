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

          '&.active::after, &:hover::after': {
            transform: 'scaleX(1)',
          },

          '&:hover': {
            color: 'white',
            textDecoration: 'none',
          },
        });

        const activeStyle = css(linkStyle, { active: true });

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
              transition: 'all 200ms ease',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              p={[2, 3]}
              overflow={['auto', 'initial']}
            >
              <Box display="flex" alignItems="center" css={{ transition: 'opacity 200ms ease' }}>
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
                  <LogoIcon src={pig} alt="Prase" />{' '}
                  <Box display={['none', 'inline']}>Žrádelník</Box>{' '}
                  <LogoIcon src={cow} alt="Kráva" />
                </Link>
              </Box>
              <BoxNav display="flex">
                <RecipeSearch recipes={recipes} onSelected={props.onRecipeSelected} />
                <Link to="/" getProps={getLinkProps}>
                  Recepty
                </Link>
                <Link to="/prilohy" getProps={getLinkProps}>
                  Přílohy
                </Link>
                {props.isUserAdmin && (
                  <Link to="/admin" getProps={getLinkProps}>
                    Admin
                  </Link>
                )}
                {isOnline() && (
                  <>
                    <NavItem css={{ paddingLeft: 0, paddingRight: 0 }}>·</NavItem>
                    {!token ? (
                      <Link
                        to={
                          !props.pathname || props.pathname.startsWith('/prihlaseni')
                            ? '/prihlaseni'
                            : `/prihlaseni?u=${props.pathname || ''}`
                        }
                        getProps={getLinkProps}
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
                          <Link to="/nastaveni" getProps={getLinkProps}>
                            {props.userName}
                          </Link>
                        )}
                        <Link to={`/odhlaseni?u=${props.pathname || ''}`} getProps={getLinkProps}>
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

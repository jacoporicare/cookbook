import React from 'react';
import { IndexLink } from 'react-router';
import styled, { css } from 'react-emotion';

import { screenBreakpoints } from '../../const';
import { Recipe } from '../../types';
import { RecipeSearch } from '../RecipeSearch/RecipeSearch';
import { UserInfo } from './UserInfo';
import pig from './pig.png';
import cow from './cow.png';

type Props = {
  userName?: string;
  isAuthenticated: boolean;
  isFetchingUser: boolean;
  recipes: Recipe[];
  onRecipeSelected: (slug: string) => void;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const Logo = styled.h1`
  flex: 1 1 auto;
  margin: 0;
  font-family: 'Amatic SC', cursive;
  white-space: nowrap;

  @media (min-width: ${screenBreakpoints.md}px) {
    flex: 0 1 auto;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const Search = styled.div`
  display: none;

  @media (min-width: ${screenBreakpoints.md}px) {
    display: block;
    flex: 1 1 auto;
    padding: 0 30px;

    .react-autosuggest__container {
      max-width: 400px;
      margin: 0 auto;
    }
  }
`;

const UserInfoContainer = styled.div`
  text-align: right;
`;

export const Header = ({
  userName,
  isAuthenticated,
  isFetchingUser,
  recipes,
  onRecipeSelected,
}: Props) => (
  <div className="container">
    <Container>
      <Logo>
        <IndexLink
          to="/"
          className={css`
            &,
            &:hover {
              color: #000;
              text-decoration: none;
            }
          `}
        >
          <Icon src={pig} alt="Prase" /> Žrádelník <Icon src={cow} alt="Kráva" />
        </IndexLink>
      </Logo>
      <Search>
        <RecipeSearch recipes={recipes} onSelected={onRecipeSelected} />
      </Search>
      <UserInfoContainer>
        <UserInfo
          isAuthenticated={isAuthenticated}
          userName={userName}
          isFetchingUser={isFetchingUser}
        />
      </UserInfoContainer>
    </Container>
  </div>
);

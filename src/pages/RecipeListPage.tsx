import { Link, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { useAuth } from '../AuthContext';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { Text } from '../components/core';
import { Button, DangerAlert, InfoAlert } from '../components/elements';
import RecipeList from '../components/RecipeList/RecipeList';
import { recipeBaseFragment } from '../components/RecipeList/RecipeListItem';
import { colors } from '../styles/colors';
import { Recipe } from '../types';
import { isOnline } from '../utils';

type Props = RouteComponentProps;

const NewRecipeButton = Button.withComponent(Link);

const QUERY = gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
  }

  ${recipeBaseFragment}
`;

function RecipeListPage(props: Props) {
  // handleFetchAllRecipesClick = () => {
  //   this.props.fetchAllRecipes(
  //     this.props.recipes
  //       .filter(r => !this.props.offlineRecipeSlugs.includes(r.slug))
  //       .map(r => r.slug),
  //   );
  // };

  const [token] = useAuth();
  const { data, error, loading } = useQuery<{ recipes: Recipe[] }>(QUERY);

  if (error) {
    return <DangerAlert>Nastala neočekávná chyba.</DangerAlert>;
  }

  const recipes = (data && data.recipes) || [];
  const isEmpty = recipes.length === 0;

  return (
    <>
      <PageHeading
        buttons={
          isOnline() &&
          token && (
            <NewRecipeButton to="/novy-recept">
              <Icon icon="utensils" />
              Nový recept
            </NewRecipeButton>
          )
        }
      >
        Recepty{' '}
        <Text fontSize="0.5em" fontWeight={200} color={colors.gray600}>
          {recipes.length}
        </Text>
      </PageHeading>
      {isEmpty ? (
        <SpinnerIf spinner={loading}>
          <InfoAlert>Zatím zde není žádný recept.</InfoAlert>
        </SpinnerIf>
      ) : (
        <>
          <RecipeList recipes={recipes} />
          {/* <OfflineRecipes
              offlineRecipeCount={offlineRecipeSlugs.length}
              totalRecipeCount={recipes.length}
              onFetchAllRecipesClick={this.handleFetchAllRecipesClick}
              isFetchingAllRecipes={isFetchingAllRecipes}
            /> */}
        </>
      )}
    </>
  );
}

export default RecipeListPage;

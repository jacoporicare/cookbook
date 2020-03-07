import { useQuery } from '@apollo/react-hooks';
import { Link, RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';

import { useAuth } from '../AuthContext';
import RecipeList from '../components/RecipeList/RecipeList';
import { recipeBaseFragment } from '../components/RecipeList/RecipeListItem';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import { Text, BoxSection } from '../components/core';
import { Button, DangerAlert, InfoAlert } from '../components/elements';
import { colors } from '../styles/colors';
import { Recipe } from '../types';

type Props = RouteComponentProps;

const NewRecipeButton = Button.withComponent(Link);

export const RECIPE_LIST_QUERY = gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
  }

  ${recipeBaseFragment}
`;

export type RecipeListQueryData = {
  recipes: Recipe[];
};

function RecipeListPage(_props: Props) {
  // handleFetchAllRecipesClick = () => {
  //   this.props.fetchAllRecipes(
  //     this.props.recipes
  //       .filter(r => !this.props.offlineRecipeSlugs.includes(r.slug))
  //       .map(r => r.slug),
  //   );
  // };

  const [token] = useAuth();
  const { data, error, loading } = useQuery<RecipeListQueryData>(RECIPE_LIST_QUERY);

  if (error) {
    return <DangerAlert>Nastala neočekávná chyba.</DangerAlert>;
  }

  const recipes = (data && data.recipes) || [];
  const isEmpty = recipes.length === 0;

  return (
    <BoxSection>
      <PageHeading
        buttons={
          token && (
            <NewRecipeButton to="/novy-recept">
              <Icon icon="utensils" />
              Nový recept
            </NewRecipeButton>
          )
        }
      >
        Recepty{' '}
        <Text color={colors.gray600} fontSize="0.5em" fontWeight={200}>
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
    </BoxSection>
  );
}

export default RecipeListPage;

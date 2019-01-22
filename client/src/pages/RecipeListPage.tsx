import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Recipe, StoreState } from '../types';
import { colors } from '../styles/colors';
import { Text } from '../components/core';
import { Button, InfoAlert } from '../components/elements';
import Icon from '../components/common/Icon';
import PageHeading from '../components/common/PageHeading';
import SpinnerIf from '../components/common/SpinnerIf';
import RecipeList from '../components/RecipeList/RecipeList';
import OfflineRecipes from '../components/RecipeList/OfflineRecipes';
import { fetchAllRecipes } from '../components/RecipeDetail/actions';

type StateProps = {
  recipes: Recipe[];
  isFetching: boolean;
  isAuthenticated: boolean;
  offlineRecipeSlugs: string[];
  isFetchingAllRecipes: boolean;
};

type DispatchProps = {
  fetchAllRecipes: (slugs: string[]) => void;
};

type Props = StateProps & DispatchProps;

const NewRecipeButton = Button.withComponent(Link);

class RecipeListPage extends Component<Props> {
  handleFetchAllRecipesClick = () => {
    this.props.fetchAllRecipes(
      this.props.recipes
        .filter(r => !this.props.offlineRecipeSlugs.includes(r.slug))
        .map(r => r.slug),
    );
  };

  render() {
    const {
      isFetching,
      isAuthenticated,
      recipes,
      offlineRecipeSlugs,
      isFetchingAllRecipes,
    } = this.props;
    const isEmpty = recipes.length === 0;

    return (
      <>
        <PageHeading
          buttons={
            navigator.onLine &&
            isAuthenticated && (
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
          <SpinnerIf spinner={isFetching}>
            <InfoAlert>Zatím zde není žádný recept.</InfoAlert>
          </SpinnerIf>
        ) : (
          <>
            <RecipeList recipes={recipes} />
            <OfflineRecipes
              offlineRecipeCount={offlineRecipeSlugs.length}
              totalRecipeCount={recipes.length}
              onFetchAllRecipesClick={this.handleFetchAllRecipesClick}
              isFetchingAllRecipes={isFetchingAllRecipes}
            />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state: StoreState): StateProps {
  const { recipes, isFetching } = state.recipeList;
  const { isAuthenticated } = state.auth;
  const { recipesBySlug, isFetchingAllRecipes } = state.recipeDetail;

  return {
    recipes,
    isFetching,
    isAuthenticated,
    offlineRecipeSlugs: Object.keys(recipesBySlug),
    isFetchingAllRecipes,
  };
}

const mapDispatchToProps: DispatchProps = {
  fetchAllRecipes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeListPage);

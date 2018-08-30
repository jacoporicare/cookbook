import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Recipe, StoreState } from '../types';
import { colors } from '../styles/colors';
import { Text } from '../components/core';
import { Button } from '../components/elements/Button';
import { InfoAlert } from '../components/elements/Alert';
import { Icon } from '../components/common/Icon';
import { PageHeading } from '../components/common/PageHeading';
import { SpinnerIf } from '../components/common/SpinnerIf';
import { RecipeList } from '../components/RecipeList/RecipeList';

type StateProps = {
  recipes: Recipe[];
  isFetching: boolean;
  isAuthenticated: boolean;
};

type Props = StateProps;

const NewRecipeButton = Button.withComponent(Link);

class RecipeListPageBase extends Component<Props> {
  render() {
    const { isFetching, isAuthenticated, recipes } = this.props;
    const isEmpty = recipes.length === 0;

    return (
      <>
        <PageHeading
          buttons={
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
          <RecipeList recipes={recipes} />
        )}
      </>
    );
  }
}

function mapStateToProps(state: StoreState): StateProps {
  const { recipes, isFetching } = state.recipeList;
  const { isAuthenticated } = state.auth;

  return {
    recipes,
    isFetching,
    isAuthenticated,
  };
}

export const RecipeListPage = connect(mapStateToProps)(RecipeListPageBase);

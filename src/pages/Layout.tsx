import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Notifications from 'react-notify-toast';
import { RouteComponentProps } from '@reach/router';

import { User, Recipe, StoreState } from '../types';
import { colors } from '../styles/colors';
import { isOnline } from '../utils';
import DocumentTitle from '../components/common/DocumentTitle';
import { fetchRecipeList, RecipeListAction } from '../components/RecipeList/actions';
import { fetchUser, AuthAction } from '../components/Auth/actions';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Box } from '../components/core';

type Props = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | undefined;
  isFetchingUser: boolean;
  fetchUserError: boolean;
  recipes: Recipe[];
  isFetchingRecipes: boolean;
  fetchUser: () => Promise<AuthAction>;
  fetchRecipeList: () => Promise<RecipeListAction>;
} & RouteComponentProps;

class Layout extends React.Component<Props> {
  componentDidMount() {
    if (!isOnline()) {
      return;
    }

    const { isAuthenticated, user, fetchUser, fetchRecipeList } = this.props;

    fetchRecipeList();

    if (isAuthenticated && !user) {
      fetchUser();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!isOnline()) {
      return;
    }

    const {
      isAuthenticated,
      user,
      isFetchingUser,
      fetchUserError,
      isFetchingRecipes,
      fetchUser,
      fetchRecipeList,
    } = this.props;

    if (isAuthenticated && !user && !isFetchingUser && !fetchUserError) {
      fetchUser();
    }

    if (isAuthenticated && !prevProps.isAuthenticated && !isFetchingRecipes) {
      fetchRecipeList();
    }
  }

  handleRecipeSelected = (slug: string) => {
    this.props.navigate && this.props.navigate(`/recept/${slug}`);
  };

  render() {
    const { isAuthenticated, user, isFetchingUser, children } = this.props;

    return (
      <>
        <DocumentTitle />
        <Notifications options={{ zIndex: 1100 }} />
        <Header
          isAuthenticated={isAuthenticated}
          userName={user ? user.name : undefined}
          isFetchingUser={isFetchingUser}
          recipes={this.props.recipes}
          onRecipeSelected={this.handleRecipeSelected}
        />
        <Box p={[3, 4]}>
          {children}
          <Box mt={[3, 4]} pt={2} borderTop={`1px solid ${colors.gray200}`}>
            <Footer />
          </Box>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isFetchingUser: state.auth.isFetchingUser,
  fetchUserError: state.auth.error,
  recipes: state.recipeList.recipes,
  isFetchingRecipes: state.recipeList.isFetching,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, {}, AnyAction>) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchRecipeList: () => dispatch(fetchRecipeList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);

import React from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Notifications from 'react-notify-toast';

import { User, Recipe, StoreState } from '../types';
import { DocumentTitle } from '../components/DocumentTitle/DocumentTitle';
import { fetchRecipeList, RecipeListAction } from '../components/RecipeList/actions';
import { fetchUser, AuthAction } from '../components/Auth/actions';
import { Header } from '../components/Header/Header';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

type Props = RouteComponentProps<{}, {}> & {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | undefined;
  isFetchingUser: boolean;
  fetchUserError: boolean;
  recipes: Recipe[];
  isFetchingRecipes: boolean;
  fetchUser: () => Promise<AuthAction>;
  fetchRecipeList: () => Promise<RecipeListAction>;
};

class LayoutBase extends React.Component<Props> {
  componentDidMount() {
    const { isAuthenticated, user, fetchUser, fetchRecipeList } = this.props;

    fetchRecipeList();

    if (isAuthenticated && !user) {
      fetchUser();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { fetchUser, fetchRecipeList } = this.props;
    const { isAuthenticated, user, isFetchingUser, fetchUserError, isFetchingRecipes } = nextProps;

    if (isAuthenticated) {
      if (!user && !isFetchingUser && !fetchUserError) {
        fetchUser();
      }

      if (!this.props.isAuthenticated && !isFetchingRecipes) {
        fetchRecipeList();
      }
    }
  }

  handleRecipeSelected = (slug: string) => {
    this.props.router.push(`/recept/${slug}`);
  };

  render() {
    const { isAuthenticated, user, isFetchingUser, router, children } = this.props;

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
        <Navbar router={router} />
        {children}
        <Footer />
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

export const Layout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutBase);

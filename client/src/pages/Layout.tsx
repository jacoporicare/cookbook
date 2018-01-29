import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Notifications from 'react-notify-toast';

import { User, Recipe, StoreState } from '../types';
import { fetchRecipeList, RecipeListAction } from '../components/RecipeList/actions';
import { fetchUser, NavbarAction } from '../components/Navbar/actions';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

interface Props extends RouteComponentProps<{}, {}> {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | undefined;
  isFetchingUser: boolean;
  fetchUserError: boolean;
  recipes: Recipe[];
  isFetchingRecipes: boolean;
  fetchUser: () => Promise<NavbarAction>;
  fetchRecipeList: () => Promise<RecipeListAction>;
}

class Layout extends React.Component<Props> {
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
  user: state.navbar.user,
  isFetchingUser: state.navbar.isFetchingUser,
  fetchUserError: state.navbar.error,
  recipes: state.recipeList.recipes,
  isFetchingRecipes: state.recipeList.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchRecipeList: () => dispatch(fetchRecipeList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

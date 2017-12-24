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
  fetchUser: () => Promise<NavbarAction>;
  fetchRecipeList: () => Promise<RecipeListAction>;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    const { isAuthenticated, user, fetchUser, fetchRecipeList } = this.props;

    if (isAuthenticated) {
      if (!user) {
        fetchUser();
      }

      fetchRecipeList();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { fetchUser } = this.props;
    const { isAuthenticated, user, isFetchingUser, fetchUserError } = nextProps;

    if (isAuthenticated) {
      if (!user && !isFetchingUser && !fetchUserError) {
        fetchUser();
      }

      if (!this.props.isAuthenticated) {
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
      <div>
        <Notifications options={{ zIndex: 1100 }} />
        <Header
          isAuthenticated={isAuthenticated}
          userName={user ? user.name : undefined}
          isFetchingUser={isFetchingUser}
          recipes={this.props.recipes}
          onRecipeSelected={this.handleRecipeSelected}
        />
        {isAuthenticated && <Navbar router={router} />}
        {children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.navbar.user,
  isFetchingUser: state.navbar.isFetchingUser,
  fetchUserError: state.navbar.error,
  recipes: state.recipeList.recipes,
});

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchRecipeList: () => dispatch(fetchRecipeList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

import React from 'react';
import { connect } from 'react-redux';
import { Router } from '@reach/router';

import Layout from './pages/Layout';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import SideDishListPage from './pages/SideDishListPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import { StoreState } from './types';

type StateProps = {
  isAuthenticated: boolean;
};

type Props = StateProps;

function Routes({ isAuthenticated }: Props) {
  return (
    <Router>
      <Layout path="/">
        <RecipeListPage path="/" />
        <RecipeDetailPage path="recept/:slug" />
        {isAuthenticated && <RecipeEditPage path="recept/:slug/upravit" />}
        {isAuthenticated && <RecipeEditPage path="novy-recept" />}
        <SideDishListPage path="prilohy" />
        <LoginPage path="prihlaseni" />
        <LogoutPage path="odhlaseni" />
        <NotFoundPage default />
      </Layout>
    </Router>
  );
}

function mapStateToProps(state: StoreState): StateProps {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Routes);

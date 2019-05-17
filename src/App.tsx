import { Router } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import RecipeListPage from './pages/RecipeListPage';
import SideDishListPage from './pages/SideDishListPage';
import { StoreState } from './types';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/reboot';

type StateProps = {
  isAuthenticated: boolean;
};

type Props = StateProps;

function App({ isAuthenticated }: Props) {
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

export default connect(mapStateToProps)(App);

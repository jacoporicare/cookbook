import React from 'react';
import { Route, IndexRoute } from 'react-router';
import authenticatedComponent from './components/Auth/authenticatedComponent';
import Layout from './pages/Layout';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import SideDishListPage from './pages/SideDishListPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={authenticatedComponent(RecipeListPage)} />
    <Route path="recept/:slug" component={authenticatedComponent(RecipeDetailPage)} />
    <Route path="recept/:slug/upravit" component={authenticatedComponent(RecipeEditPage)} />
    <Route path="novy-recept" component={authenticatedComponent(RecipeEditPage)} />
    <Route path="prilohy" component={authenticatedComponent(SideDishListPage)} />
    <Route path="prihlaseni" component={LoginPage} />
    <Route path="odhlaseni" component={authenticatedComponent(LogoutPage)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

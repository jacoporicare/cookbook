import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AuthenticatedComponent from './components/AuthenticatedComponent/AuthenticatedComponent';
import AppPage from './pages/AppPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import SideDishListPage from './pages/SideDishListPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={AppPage}>
    <IndexRoute component={AuthenticatedComponent(RecipeListPage)} />
    <Route path="recept/:slug" component={AuthenticatedComponent(RecipeDetailPage)} />
    <Route path="recept/:slug/upravit" component={AuthenticatedComponent(RecipeEditPage)} />
    <Route path="novy-recept" component={AuthenticatedComponent(RecipeEditPage)} />
    <Route path="prilohy" component={AuthenticatedComponent(SideDishListPage)} />
    <Route path="prihlaseni" component={LoginPage} />
    <Route path="odhlaseni" component={AuthenticatedComponent(LogoutPage)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

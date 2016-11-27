import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppPage from './pages/AppPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import SideDishListPage from './pages/SideDishListPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={AppPage}>
    <IndexRoute component={RecipeListPage} />
    <Route path="recept/:slug" component={RecipeDetailPage} />
    <Route path="recept/upravit/:slug" component={RecipeEditPage} />
    <Route path="prilohy" component={SideDishListPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

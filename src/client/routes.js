import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppPage from './pages/AppPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={AppPage}>
    <IndexRoute component={RecipeListPage} />
    <Route path="recept/:id" component={RecipeDetailPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

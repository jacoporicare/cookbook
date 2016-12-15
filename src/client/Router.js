import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import AppPage from './pages/AppPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import SideDishListPage from './pages/SideDishListPage';
import NotFoundPage from './pages/NotFoundPage';

const CookbookRouter = ({ store }) => (
  <Router
    history={syncHistoryWithStore(browserHistory, store)}
    render={applyRouterMiddleware(useScroll())}
  >
    <Route path="/" component={AppPage}>
      <IndexRoute component={RecipeListPage} />
      <Route path="recept/:slug" component={RecipeDetailPage} />
      <Route path="recept/:slug/upravit" component={RecipeEditPage} />
      <Route path="novy-recept" component={RecipeEditPage} />
      <Route path="prilohy" component={SideDishListPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);

CookbookRouter.propTypes = {
  store: PropTypes.object.isRequired
};

export default CookbookRouter;

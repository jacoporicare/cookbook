import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppPage from './pages/AppPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={AppPage}>
    <IndexRoute component={HomePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

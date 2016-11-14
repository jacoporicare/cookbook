import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './pages/App';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

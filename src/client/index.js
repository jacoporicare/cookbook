import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import routes from './routes';
import configureStore from './store/configureStore.js';
import { fetchRecipes } from './actions/recipesActions';

import './App.scss';

const store = configureStore();
store.dispatch(fetchRecipes());

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
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

const App = () => {
  return (
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>
  );
};

export default App;

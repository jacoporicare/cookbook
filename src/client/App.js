import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import cookie from 'react-cookie';
import configureStore from './store/configureStore';
import { setAuthToken } from './actions/authActions';
import routes from './routes';

import './App.scss';

const store = configureStore();

class App extends React.Component {
  componentWillMount() {
    const token = cookie.load('token');
    if (token) {
      store.dispatch(setAuthToken(token));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router
          history={syncHistoryWithStore(browserHistory, store)}
          render={applyRouterMiddleware(useScroll())}
          routes={routes}
        />
      </Provider>
    );
  }
}

export default App;

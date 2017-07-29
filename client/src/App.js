import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { withCookies, Cookies } from 'react-cookie';
import configureStore from './redux/configureStore';
import { setAuthToken } from './components/Auth/actions';
import routes from './routes';

import './App.scss';

const store = configureStore();

class App extends Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  componentDidMount() {
    const { cookies } = this.props;
    const token = cookies.get('token');

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

export default withCookies(App);

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { withCookies, CookiesProps } from 'react-cookie';

import configureStore from './redux/configureStore';
import { setAuthToken } from './components/Auth/actions';
import routes from './routes';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/reboot';

type Props = CookiesProps;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routerRender = applyRouterMiddleware(useScroll());

class AppBase extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const token = props.cookies.get('token');

    if (token) {
      store.dispatch(setAuthToken(token));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history} render={routerRender} routes={routes} />
      </Provider>
    );
  }
}

export const App = withCookies(AppBase);

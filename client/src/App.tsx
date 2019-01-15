import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { withCookies, CookiesProps } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './redux/configureStore';
import { setAuthToken } from './components/Auth/actions';
import routes from './routes';

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/reboot';

type Props = CookiesProps;

const { store, persistor } = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routerRender = applyRouterMiddleware(useScroll());

class App extends Component<Props> {
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
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history} render={routerRender} routes={routes} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withCookies(App);

import React from 'react';
import { Provider } from 'react-redux';
import cookie from 'react-cookie';
import configureStore from './store/configureStore';
import { setAuthToken } from './actions/authActions';
import Router from './Router';

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
        <Router store={store} />
      </Provider>
    );
  }
}

export default App;

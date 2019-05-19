import '@babel/polyfill';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';

import configureClient from './apollo/apolloClient';
import App from './App';
import ManageScroll from './ManageScroll';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import { StoreState } from './types';

const { store } = configureStore((window as any).__REDUX_STATE__ as StoreState);
const apolloClient = configureClient((window as any).__APOLLO_STATE__ as NormalizedCacheObject);

ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <App />
      <ManageScroll />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.register();

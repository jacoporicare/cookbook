import 'core-js/stable';

import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

import App from './App';
import { AuthProvider } from './AuthContext';
import ManageScroll from './ManageScroll';
import configureClient from './api/apolloClient';
import { getAuthTokenCookie } from './clientAuth';
import * as serviceWorker from './serviceWorker';

const apolloClient = configureClient({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: (window as any).__APOLLO_STATE__ as NormalizedCacheObject,
});

ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <AuthProvider token={getAuthTokenCookie()}>
      <App />
      <ManageScroll />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

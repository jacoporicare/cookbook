import 'core-js/stable';

import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

import configureClient from './api/apolloClient';
import App from './App';
import ManageScroll from './ManageScroll';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './AuthContext';
import { getAuthTokenCookie } from './clientAuth';

const apolloClient = configureClient({
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

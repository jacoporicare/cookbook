import '@babel/polyfill';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

import configureClient from './apollo/apolloClient';
import App from './App';
import ManageScroll from './ManageScroll';
import * as serviceWorker from './serviceWorker';

const apolloClient = configureClient((window as any).__APOLLO_STATE__ as NormalizedCacheObject);

ReactDOM.hydrate(
  <ApolloProvider client={apolloClient}>
    <App />
    <ManageScroll />
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.register();

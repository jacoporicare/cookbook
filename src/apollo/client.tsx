/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any  */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';

/**
 * Creates and configures the ApolloClient
 */
export function createApolloClient(
  ctx: Pick<NextPageContext, 'req' | 'res'>,
  initialState: NormalizedCacheObject,
) {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/vercel/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    link: createIsomorphLink(ctx),
    cache,
  });
}

function createIsomorphLink(ctx: Pick<NextPageContext, 'req' | 'res'>) {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const schema = require('./schema').default;

    return new SchemaLink({ schema, context: ctx });
  }

  const { createUploadLink } = require('apollo-upload-client');

  // const token = getAuthToken();

  return createUploadLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    // headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

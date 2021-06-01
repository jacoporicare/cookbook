import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { NextPageContext } from 'next';
import getConfig from 'next/config';

import { getAuthToken } from '../auth';

const { publicRuntimeConfig } = getConfig();

export function createApolloClient(
  ctx: Pick<NextPageContext, 'req' | 'res'>,
  initialState: NormalizedCacheObject,
) {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  return new ApolloClient({
    ssrMode,
    link: createAuthLink(ctx).concat(createTerminatingLink()),
    cache,
  });
}

function createAuthLink(ctx: Pick<NextPageContext, 'req' | 'res'>) {
  const cookie = ctx.req?.headers.cookie;

  return setContext((_, { headers }) => {
    const token = getAuthToken(cookie);

    return {
      headers: token ? { ...headers, Authorization: `Bearer ${token}` } : {},
    };
  });
}

function createTerminatingLink() {
  return createUploadLink({
    uri: publicRuntimeConfig.apiUrl,
    credentials: 'include',
  });
}

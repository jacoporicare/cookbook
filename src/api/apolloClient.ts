import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { getAuthTokenCookie } from '../clientAuth';

export default function configureClient(
  config: { initialState?: NormalizedCacheObject; authToken?: string } = {},
) {
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    const token = config.authToken || getAuthTokenCookie();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      const formattedGraphQLErrors = graphQLErrors.map(
        ({ message, locations, path }) =>
          `[GraphQL error]: Message: ${message}, Operation: ${
            operation.operationName
          }, Locations: ${locations &&
            locations
              .map(location => `${location.line}:${location.column}`)
              .join(', ')}, Path: ${path}`,
      );
      if (process.env.BUILD_TARGET === 'server') {
        formattedGraphQLErrors.forEach(error => console.error(error, operation));
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const terminatingLink = createUploadLink({
    uri: process.env.BUILD_TARGET === 'server' ? process.env.GRAPHQL_URI : '/graphql',
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, terminatingLink]),
    cache: config.initialState ? cache.restore(config.initialState) : cache,
    ssrMode: process.env.BUILD_TARGET === 'server',
  });
}
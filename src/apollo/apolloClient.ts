import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { getAuthToken } from '../clientAuth';

export default function configureClient(initialState?: NormalizedCacheObject) {
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    const token = getAuthToken();

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

  // This link batches multiple requests on transport layer
  const batchLink = new BatchHttpLink({ uri: process.env.RAZZLE_GRAPHQL_URI });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, batchLink]),
    cache: initialState ? cache.restore(initialState) : cache,
    // https://www.apollographql.com/docs/react/features/developer-tooling.html#devtools
    ssrMode: process.env.BUILD_TARGET === 'server',
  });
}

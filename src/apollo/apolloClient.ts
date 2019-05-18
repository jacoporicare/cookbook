import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';
import {
  InMemoryCache,
  defaultDataIdFromObject,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import 'isomorphic-fetch';

export default function configureClient(initialState?: NormalizedCacheObject) {
  const cache = new InMemoryCache({
    addTypename: true,
    // Cache key used for data normalization
    // https://www.apollographql.com/docs/react/advanced/caching.html#normalization
    dataIdFromObject: object => {
      if (object.__typename !== undefined) {
        // We use _id
        if (object['_id'] !== undefined) {
          return `${object.__typename}:${object['_id']}`;
        }
      }

      return defaultDataIdFromObject(object);
    },
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
      if (process.env.BUILD_TARGET === 'server' && process.env.NODE_ENV === 'production') {
        formattedGraphQLErrors.forEach(error => console.error(error, operation));
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  // This link batches multiple requests on transport layer
  const batchLink = new BatchHttpLink({
    uri: process.env.GRAPHQL_URI,
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, batchLink]),
    cache: initialState ? cache.restore(initialState) : cache,
    // https://www.apollographql.com/docs/react/features/developer-tooling.html#devtools
    connectToDevTools:
      process.env.BUILD_TARGET === 'client' && process.env.NODE_ENV !== 'production',
    ssrMode: process.env.BUILD_TARGET === 'server',
  });
}

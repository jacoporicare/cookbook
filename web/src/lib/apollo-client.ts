import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { cookies } from 'next/headers';

import { AUTH_TOKEN_KEY } from '@/const';

/**
 * Creates an Apollo Client instance for server-side use.
 * Each request gets a fresh client instance with the current auth token.
 */
export async function getClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.API_URL || 'http://localhost:4000'}/graphql`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    ssrMode: true,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });
}

let publicClient: ApolloClient | undefined;

/**
 * Anonymous Apollo Client for public, user-agnostic queries (recipes, recipe
 * detail, edit options). It does NOT read cookies or send an auth token, so it
 * is safe to call inside `use cache` scopes (which cannot access `cookies()`).
 *
 * A single shared instance is reused across requests: the data is identical for
 * every caller and result caching is handled by Next's `use cache`, not Apollo.
 */
export function getPublicClient() {
  if (!publicClient) {
    publicClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${process.env.API_URL || 'http://localhost:4000'}/graphql`,
      }),
      ssrMode: true,
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
        },
      },
    });
  }

  return publicClient;
}

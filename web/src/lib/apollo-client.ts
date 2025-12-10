import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';
import { AUTH_TOKEN_KEY } from '@/const';

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.API_URL || 'http://localhost:4000/graphql',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      fetchOptions: {
        cache: 'no-store',
      },
    }),
  });
});

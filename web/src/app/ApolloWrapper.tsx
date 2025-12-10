'use client';

import { ApolloLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { ReactNode } from 'react';
import { AUTH_TOKEN_KEY } from '@/const';

function makeClient() {
  const uploadLink = createUploadLink({
    uri: process.env.API_URL || 'http://localhost:4000/graphql',
    credentials: 'same-origin',
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token =
      typeof document !== 'undefined'
        ? document.cookie
            .split('; ')
            .find(row => row.startsWith(`${AUTH_TOKEN_KEY}=`))
            ?.split('=')[1]
        : undefined;

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }));

    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(uploadLink as unknown as ApolloLink),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}

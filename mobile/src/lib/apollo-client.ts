import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { Platform } from 'react-native';

const LOCAL_API_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';

export const API_URL = process.env.EXPO_PUBLIC_API_URL || LOCAL_API_URL;

export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.replace('http://localhost:4000', API_URL);
}

export async function initApolloClient() {
  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
    trigger: 'background',
  });

  return new ApolloClient({
    link: new HttpLink({ uri: `${API_URL}/graphql` }),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

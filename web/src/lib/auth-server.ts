import { ApolloClient } from '@apollo/client';
import { cookies } from 'next/headers';

import { AUTH_TOKEN_KEY } from '@/const';
import { MeDocument, MeQuery } from '@/generated/graphql';
import { User } from '@/types/user';

export async function getCurrentUser(
  client: ApolloClient,
): Promise<MeQuery['me'] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  if (!token) {
    return null;
  }

  try {
    const { data } = await client.query({ query: MeDocument });
    return data?.me ?? null;
  } catch {
    return null;
  }
}

export function toUser(meResult: MeQuery['me'] | null): User {
  return meResult
    ? { name: meResult.displayName, isAdmin: meResult.isAdmin }
    : null;
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY)?.value;
}

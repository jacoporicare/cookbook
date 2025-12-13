import { cookies } from 'next/headers';

import { getClient } from './apollo-client';
import { AUTH_TOKEN_KEY } from '@/const';
import { MeDocument, MeQuery } from '@/generated/graphql';

export async function getCurrentUser(): Promise<MeQuery['me'] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  if (!token) {
    return null;
  }

  try {
    const client = await getClient();
    const { data } = await client.query({ query: MeDocument });
    return data.me;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY)?.value;
}

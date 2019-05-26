import Cookies from 'universal-cookie';

import { AUTH_TOKEN_KEY } from './const';

export function getAuthTokenCookie(): string | null {
  if (process.env.BUILD_TARGET !== 'client') {
    return null;
  }

  return new Cookies().get(AUTH_TOKEN_KEY) || null;
}

export function setAuthTokenCookie(token: string | null): void {
  if (process.env.BUILD_TARGET !== 'client') {
    return;
  }

  if (!token) {
    new Cookies().remove(AUTH_TOKEN_KEY);
  }

  return new Cookies().set(AUTH_TOKEN_KEY, token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

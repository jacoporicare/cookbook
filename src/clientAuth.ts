import Cookies from 'universal-cookie';

import { AUTH_TOKEN_KEY } from './const';

export function getAuthToken(): string {
  if (process.env.BUILD_TARGET !== 'client') {
    return '';
  }

  return new Cookies().get(AUTH_TOKEN_KEY) || '';
}

export function setAuthToken(token: string): void {
  if (process.env.BUILD_TARGET !== 'client') {
    return;
  }

  return new Cookies().set(AUTH_TOKEN_KEY, token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}

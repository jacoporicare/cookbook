import { AUTH_TOKEN_KEY } from './const';

function getCookie(name: string, cookie?: string): string | undefined {
  const cookieStr =
    cookie || (typeof document !== 'undefined' ? document.cookie : '');
  const value = `; ${cookieStr}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

export function getAuthToken(cookie?: string): string | undefined {
  return getCookie(AUTH_TOKEN_KEY, cookie);
}

export function setAuthToken(token?: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (!token) {
    document.cookie = `${AUTH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    return;
  }

  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; expires=${expires}; path=/`;
}

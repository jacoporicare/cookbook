import { AUTH_TOKEN_KEY } from './const';
import { User } from './types/user';

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

/**
 * Decodes the current user directly from the JWT auth cookie, entirely on the
 * client — no server round-trip. The API embeds `displayName`/`isAdmin` in the
 * token payload (see api/src/auth.ts) precisely so the nav can render the right
 * state from the static shell without opting the page into dynamic rendering.
 *
 * Returns `null` when there is no (valid) token, i.e. a guest.
 */
export function getAuthUser(cookie?: string): User {
  const token = getAuthToken(cookie);
  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }

    // JWT payloads are base64url; decode as UTF-8 so diacritics in the display
    // name (e.g. "Řičař") survive — plain atob() would mangle multi-byte chars.
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const decoded = JSON.parse(new TextDecoder().decode(bytes)) as {
      displayName?: unknown;
      isAdmin?: unknown;
    };

    if (typeof decoded.displayName !== 'string') {
      return null;
    }

    return { name: decoded.displayName, isAdmin: decoded.isAdmin === true };
  } catch {
    return null;
  }
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

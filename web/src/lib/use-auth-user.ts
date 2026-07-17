'use client';

import { useSyncExternalStore } from 'react';

import { getAuthToken, getAuthUser } from '@/auth';
import { User } from '@/types/user';

// Cache the derived user keyed by the raw token so getSnapshot returns a stable
// reference between renders (useSyncExternalStore compares with Object.is and
// would loop if we returned a fresh object each time).
let cachedToken: string | undefined;
let cachedUser: User = null;
let initialized = false;

function getSnapshot(): User {
  // `getAuthToken()` is only the cache key; `getAuthUser()` re-reads the cookie
  // itself (it takes an optional cookie *string*, not a token — passing the raw
  // token here would make it look for `auth_token=` inside the token and fail).
  const token = getAuthToken();
  if (!initialized || token !== cachedToken) {
    cachedToken = token;
    cachedUser = getAuthUser();
    initialized = true;
  }
  return cachedUser;
}

function subscribe(callback: () => void) {
  // The cookie only changes via the login/logout server actions, which navigate
  // and re-render this tree; re-reading on window focus covers other tabs.
  window.addEventListener('focus', callback);
  return () => window.removeEventListener('focus', callback);
}

/**
 * The current user, resolved client-side from the JWT cookie.
 *
 * Returns `undefined` on the server and until hydration ("unknown"), then the
 * decoded `User` or `null` (guest). Rendering the "unknown" state as a neutral
 * placeholder — rather than guessing "guest" — is what stops the navbar from
 * flashing the login button before the signed-in state swaps in.
 */
export function useAuthUser(): User | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

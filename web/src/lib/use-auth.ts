'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { AUTH_TOKEN_KEY } from '@/const';

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

const listeners = new Set<() => void>();

export function useAuth(): [string | undefined, (token?: string) => void] {
  const token = useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    () => getCookie(AUTH_TOKEN_KEY),
    () => undefined,
  );

  const setToken = useCallback((newToken?: string) => {
    if (newToken) {
      setCookie(AUTH_TOKEN_KEY, newToken, 30);
    } else {
      deleteCookie(AUTH_TOKEN_KEY);
    }

    listeners.forEach((listener) => listener());
  }, []);

  return [token, setToken];
}

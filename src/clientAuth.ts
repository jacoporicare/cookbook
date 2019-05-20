const AUTH_TOKEN_KEY = 'authToken';

export function setAuthToken(token: string): void {
  if (process.env.BUILD_TARGET !== 'client') {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  if (process.env.BUILD_TARGET !== 'client') {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getHeaders(headers?: HeadersInit): HeadersInit {
  const authToken = getAuthToken();

  return {
    ...headers,
    authorization: authToken ? `Bearer ${authToken}` : '',
  };
}

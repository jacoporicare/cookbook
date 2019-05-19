import { User } from './types';

const AUTH_TOKEN_KEY = 'authToken';

type LoginResponse = {
  token: string;
  user: User;
};

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed.');
  }

  const data = (await response.json()) as LoginResponse;
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);

  return data;
}

export function getAuthToken(): string | null {
  return process.env.BUILD_TARGET === 'client' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getHeaders(headers?: HeadersInit): HeadersInit | undefined {
  const authToken = getAuthToken();

  if (!authToken) {
    return headers;
  }

  return {
    ...headers,
    authorization: `Bearer ${authToken}`,
  };
}

import { NextPage } from 'next';
import Cookies from 'universal-cookie';

import { AuthProvider } from './AuthContext';
import { AUTH_TOKEN_KEY } from './const';

export function getAuthToken(cookie?: string): string | undefined {
  return new Cookies(cookie).get(AUTH_TOKEN_KEY);
}

export function setAuthToken(token?: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!token) {
    new Cookies().remove(AUTH_TOKEN_KEY, { path: '/' });

    return;
  }

  return new Cookies().set(AUTH_TOKEN_KEY, token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    path: '/',
  });
}

export const withAuth = () => (PageComponent: NextPage) => {
  const WithAuth: NextPage<{ authToken?: string }, { authToken?: string }> = ({
    authToken,
    ...pageProps
  }) => (
    <AuthProvider token={authToken}>
      <PageComponent {...pageProps} />
    </AuthProvider>
  );

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';
    WithAuth.displayName = `withAuth(${displayName})`;
  }

  WithAuth.getInitialProps = async ctx => {
    const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

    return {
      ...pageProps,
      authToken: new Cookies(ctx.req?.headers.cookie).get(AUTH_TOKEN_KEY),
    };
  };

  return WithAuth;
};

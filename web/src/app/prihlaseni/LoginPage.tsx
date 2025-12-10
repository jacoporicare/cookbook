'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '../AuthProvider';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm/LoginForm';
import { MeDocument, useLoginMutation } from '@/generated/graphql';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setToken] = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const redirectUri = searchParams.get('redirect_uri');
  const returnUrl = searchParams.get('u');

  const [login, { loading, error }] = useLoginMutation({
    refetchQueries: result => {
      const token = result.data && result.data.login.token;

      if (!token) {
        return [];
      }

      setToken(token);

      return [{ query: MeDocument }];
    },
    onCompleted: data => {
      if (!redirectUri) {
        router.push(returnUrl || '/');
        return;
      }

      const redirectUrl = new URL(redirectUri);
      redirectUrl.searchParams.set('access_token', data.login.token);

      window.location.href = redirectUrl.toString();
    },
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target;

    switch (name) {
      case 'username':
        setUsername(value);
        break;

      case 'password':
        setPassword(value);
        break;

      case 'rememberMe':
        setRememberMe(checked);
        break;

      default:
        break;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({ variables: { username, password } });
    } catch (e) {
      // To prevent uncaught promise, using error from the tuple
    }
  }

  if (redirectUri) {
    return (
      <LoginForm
        error={Boolean(error)}
        isSubmitting={loading}
        password={password}
        rememberMe={rememberMe}
        username={username}
        isForWebView
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <Layout static>
      <LoginForm
        error={Boolean(error)}
        isSubmitting={loading}
        password={password}
        rememberMe={rememberMe}
        username={username}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
}

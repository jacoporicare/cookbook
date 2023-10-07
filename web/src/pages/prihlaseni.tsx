import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm/LoginForm';
import DocumentTitle from '../components/common/DocumentTitle';
import { MeDocument, useLoginMutation } from '../generated/graphql';

function LoginPage() {
  const router = useRouter();
  const [, setToken] = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [login, { loading, error }] = useLoginMutation({
    refetchQueries: result => {
      const token = result.data && result.data.login.token;

      // refetchQueries callback and even those returned queries are called before .then
      // we have to set the token here so the ME_QUERY gets the fresh token
      if (!token) {
        return [];
      }

      setToken(token);

      return [{ query: MeDocument }];
    },
    onCompleted: data => {
      if (!router.query.redirect_uri) {
        router.push(router.query.u?.toString() || '/');

        return;
      }

      const redirectUri = new URL(router.query.redirect_uri.toString());
      redirectUri.searchParams.set('access_token', data.login.token);

      window.location.href = redirectUri.toString();
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

  if (router.query.redirect_uri) {
    return (
      <>
        <DocumentTitle title="Přihlášení" />
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
      </>
    );
  }

  return (
    <Layout>
      <DocumentTitle title="Přihlášení" />
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

const hocs = flow(withAuth(), withApollo());

export default hocs(LoginPage);

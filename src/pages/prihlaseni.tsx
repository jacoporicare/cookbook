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
  const [dataError, setDataError] = useState(false);

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
      if (!data || !data.login.token) {
        setDataError(true);

        return;
      }

      router.push(router.query.u?.toString() || '/');
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDataError(false);
    login({ variables: { username, password } });
  }

  return (
    <Layout>
      <DocumentTitle title="Přihlášení" />
      <LoginForm
        error={Boolean(error || dataError)}
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

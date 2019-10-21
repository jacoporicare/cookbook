import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useAuth } from '../AuthContext';
import DocumentTitle from '../components/common/DocumentTitle';
import LoginForm from '../components/LoginForm/LoginForm';

import { ME_QUERY } from './Layout';

type Props = RouteComponentProps;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export type LoginMutationData = {
  login: {
    token: string;
  };
};

function LoginPage(props: Props) {
  const [, setToken] = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [dataError, setDataError] = useState(false);

  const [login, { loading, error }] = useMutation<LoginMutationData>(LOGIN_MUTATION, {
    refetchQueries: result => {
      const token = result.data && result.data.login.token;

      // refetchQueries callback and even those returned queries are called before .then
      // we have to set the token here so the ME_QUERY gets the fresh token
      if (!token) {
        return [];
      }

      setToken(token);

      return [{ query: ME_QUERY }];
    },
    onCompleted: data => {
      if (!data || !data.login.token) {
        setDataError(true);

        return;
      }

      props.navigate &&
        props.navigate(
          props.location && props.location.search.startsWith('?u=')
            ? props.location.search.substring(3)
            : '/',
        );
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
    <>
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
    </>
  );
}

export default LoginPage;

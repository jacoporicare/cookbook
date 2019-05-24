import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const login = useMutation<LoginMutationData>(LOGIN_MUTATION, {
    refetchQueries: result => {
      // refetchQueries callback and even those returned queries are called before .then
      // we have to set the token here so the ME_QUERY gets the fresh token
      setToken(result.data ? result.data.login.token : null);

      if (!result.data) {
        return [];
      }

      return [{ query: ME_QUERY }];
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

    setIsSubmitting(true);
    setError(false);

    login({ variables: { username, password } })
      .then(({ data }) => {
        setIsSubmitting(false);

        if (data) {
          props.navigate &&
            props.navigate(
              window.location.hash.startsWith('#u=')
                ? decodeURIComponent(window.location.hash.substring(3))
                : '/',
            );
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        setError(true);
      });
  }

  return (
    <>
      <DocumentTitle title="Přihlášení" />
      <LoginForm
        username={username}
        password={password}
        rememberMe={rememberMe}
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
    </>
  );
}

export default LoginPage;

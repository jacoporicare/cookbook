import { RouteComponentProps } from '@reach/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { login } from '../clientAuth';
import DocumentTitle from '../components/common/DocumentTitle';
import LoginForm from '../components/LoginForm/LoginForm';

type Props = RouteComponentProps;

function LoginPage(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

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

    login(username, password)
      .then(() => {
        setIsSubmitting(false);
        props.navigate &&
          props.navigate(
            window.location.hash.startsWith('#u=')
              ? decodeURIComponent(window.location.hash.substring(3))
              : '/',
          );
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

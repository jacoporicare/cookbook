import React, { ChangeEvent, FormEvent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withCookies, CookiesProps, CookieSetOptions } from 'react-cookie';

import { StoreState } from '../types';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { login, AuthAction } from '../components/Auth/actions';
import { LoginForm } from '../components/LoginForm/LoginForm';

type Props = CookiesProps &
  RouteComponentProps<{}, {}> & {
    isSubmitting: boolean;
    login: (username: string, password: string) => Promise<AuthAction>;
  };

type State = {
  username: string;
  password: string;
  rememberMe: boolean;
};

class LoginPageBase extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
    rememberMe: true,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    switch (name) {
      case 'username':
        this.setState({ username: value });
        break;

      case 'password':
        this.setState({ password: value });
        break;

      case 'rememberMe':
        this.setState({ rememberMe: checked });
        break;

      default:
        break;
    }
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login, router, cookies } = this.props;
    const { username, password, rememberMe } = this.state;

    login(username, password).then(action => {
      if (action.type === 'LOGIN_FORM.LOGIN.SUCCESS') {
        const cookieOpts: CookieSetOptions = { path: '/' };

        if (rememberMe) {
          cookieOpts.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        }
        cookies.set('token', action.payload.token, cookieOpts);
        router.push(
          window.location.hash.startsWith('#u=')
            ? decodeURIComponent(window.location.hash.substring(3))
            : '/',
        );
      }
    });
  };

  render() {
    const { username, password, rememberMe } = this.state;
    const { isSubmitting } = this.props;

    return (
      <>
        <DocumentTitle title="Přihlášení" />
        <LoginForm
          username={username}
          password={password}
          rememberMe={rememberMe}
          isSubmitting={isSubmitting}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isSubmitting: state.auth.isSubmitting,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, {}, AuthAction>) => ({
  login: (username: string, password: string) => dispatch(login(username, password)),
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withCookies(LoginPageBase));

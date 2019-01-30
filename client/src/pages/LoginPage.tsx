import React, { ChangeEvent, FormEvent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { StoreState } from '../types';
import DocumentTitle from '../components/common/DocumentTitle';
import { login, AuthAction } from '../components/Auth/actions';
import LoginForm from '../components/LoginForm/LoginForm';

type OwnProps = RouteComponentProps;

type StateProps = {
  isSubmitting: boolean;
};

type DispatchProps = {
  login: (username: string, password: string) => Promise<AuthAction>;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  username: string;
  password: string;
  rememberMe: boolean;
};

class LoginPage extends React.Component<Props, State> {
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

    const { login, navigate } = this.props;
    const { username, password } = this.state;

    login(username, password).then(action => {
      if (action.type === 'LOGIN_FORM.LOGIN.SUCCESS') {
        navigate &&
          navigate(
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

function mapStateToProps(state: StoreState): StateProps {
  return {
    isSubmitting: state.auth.isSubmitting,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<StoreState, {}, AuthAction>): DispatchProps {
  return {
    login: (username: string, password: string) => dispatch(login(username, password)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

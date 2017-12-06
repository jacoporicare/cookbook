import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { login } from '../components/Auth/actions';
import LoginForm from '../components/LoginForm/LoginForm';

class LoginPage extends React.Component {
  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberMe: true,
    };
  }

  handleChange = event => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { login, router, cookies } = this.props;
    const { username, password, rememberMe } = this.state;

    login(username, password).then(action => {
      if (action.payload && action.payload.user) {
        const cookieOpts = { path: '/' };
        if (rememberMe) {
          cookieOpts.expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        }
        cookies.set('token', action.payload.token, cookieOpts);

        router.push('/');
      }
    });
  };

  render() {
    const { username, password, rememberMe } = this.state;
    const { isSubmitting } = this.props;

    return (
      <div className="container">
        <LoginForm
          username={username}
          password={password}
          rememberMe={rememberMe}
          isSubmitting={isSubmitting}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSubmitting: state.auth.isSubmitting,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LoginPage));

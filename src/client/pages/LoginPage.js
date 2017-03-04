import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { login } from '../actions/authActions';
import LoginForm from '../components/LoginForm/LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      rememberMe: true,
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, rememberMe } = this.state;

    this.props.login(username, password)
      .then((action) => {
        if (action.isSuccess) {
          const cookieOpts = { path: '/' };
          if (rememberMe) {
            cookieOpts.expires = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
          }
          cookie.save('token', action.response.token, cookieOpts);

          this.props.router.push('/');
        }
      });
  }

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

LoginPage.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isSubmitting: state.auth.isSubmitting,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

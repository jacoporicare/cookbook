import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { logout } from '../actions/authActions';

class LogoutPage extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
  };

  componentDidMount() {
    const { cookies, logout } = this.props;
    cookies.remove('token');
    logout();
    // this.props.router.push('/prihlaseni');
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(withCookies(LogoutPage));

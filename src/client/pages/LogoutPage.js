import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { logout } from '../actions/authActions';

class LogoutPage extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    cookie.remove('token');
    this.props.logout();
    // this.props.router.push('/prihlaseni');
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(LogoutPage);

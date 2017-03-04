import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { logout } from '../actions/authActions';

class LogoutPage extends React.Component {
  componentDidMount() {
    cookie.remove('token');
    this.props.logout();
    // this.props.router.push('/prihlaseni');
  }

  render() {
    return null;
  }
}

LogoutPage.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(LogoutPage);

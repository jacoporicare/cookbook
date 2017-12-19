import React from 'react';
import { connect } from 'react-redux';
import { withCookies, CookiesProps } from 'react-cookie';

import { logout, AuthAction } from '../components/Auth/actions';

interface Props extends CookiesProps {
  logout: () => AuthAction;
}

class LogoutPage extends React.Component<Props> {
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

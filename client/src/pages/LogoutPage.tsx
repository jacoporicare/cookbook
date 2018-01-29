import React from 'react';
import { connect } from 'react-redux';
import { withCookies, CookiesProps } from 'react-cookie';
import { RouteComponentProps } from 'react-router';

import { logout, AuthAction } from '../components/Auth/actions';

interface Props extends CookiesProps, RouteComponentProps<{}, {}> {
  logout: () => AuthAction;
}

class LogoutPage extends React.Component<Props> {
  componentDidMount() {
    const { cookies, router, location, logout } = this.props;
    cookies.remove('token');
    logout();
    router.push(location.query.u || '/');
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(withCookies(LogoutPage));

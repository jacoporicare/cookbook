import React from 'react';
import { connect } from 'react-redux';

import { logout, AuthAction } from '../components/Auth/actions';
import { RouteComponentProps } from '@reach/router';

type OwnProps = RouteComponentProps;

type DispatchProps = {
  logout: () => AuthAction;
};

type Props = OwnProps & DispatchProps;

class LogoutPage extends React.Component<Props> {
  componentDidMount() {
    const { location, logout, navigate } = this.props;
    logout();

    if (navigate && location) {
      navigate(new URL(location.href).searchParams.get('u') || '/');
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps: DispatchProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(LogoutPage);

import React from 'react';
import { InjectedRouter } from 'react-router';
import { connect } from 'react-redux';

import { StoreState } from '../../types';

interface Props {
  isAuthenticated: boolean;
  router: InjectedRouter;
}

const authenticatedComponent = (Component: React.ComponentType) => {
  class AuthenticatedComponent extends React.Component<Props> {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.router.push('/prihlaseni');
      }
    }

    componentWillReceiveProps(nextProps: Props) {
      if (!nextProps.isAuthenticated) {
        this.props.router.push('/prihlaseni');
      }
    }

    render() {
      if (!this.props.isAuthenticated) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state: StoreState) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default authenticatedComponent;

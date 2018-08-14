import React from 'react';
import { InjectedRouter } from 'react-router';
import { connect } from 'react-redux';

import { StoreState } from '../../types';

type Props = {
  isAuthenticated: boolean;
  router: InjectedRouter;
};

export const authenticatedComponent = (Component: React.ComponentType) => {
  class AuthenticatedComponent extends React.Component<Props> {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.redirect();
      }
    }

    componentWillReceiveProps(nextProps: Props) {
      if (!nextProps.isAuthenticated) {
        this.redirect();
      }
    }

    redirect() {
      const backUrl = encodeURIComponent(window.location.pathname);
      this.props.router.push(`/prihlaseni?u=${backUrl}`);
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
}

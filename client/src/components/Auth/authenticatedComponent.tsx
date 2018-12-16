import React from 'react';
import { InjectedRouter } from 'react-router';
import { connect } from 'react-redux';

import { StoreState } from '../../types';

type StateProps = {
  isAuthenticated: boolean;
};

type Props = StateProps & {
  router: InjectedRouter;
};

export default function authenticatedComponent<P>(Component: React.ComponentType<P>) {
  class AuthenticatedComponent extends React.Component<P & Props> {
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
      this.props.router.push(`/prihlaseni#u=${backUrl}`);
    }

    render() {
      if (!this.props.isAuthenticated) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  function mapStateToProps(state: StoreState): StateProps {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(AuthenticatedComponent as any);
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export default function AuthenticatedComponent(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.router.push('/prihlaseni');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.router.push('/prihlaseni');
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated
            ? <Component {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    router: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}

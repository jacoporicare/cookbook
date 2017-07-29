import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const authenticatedComponent = Component => {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
      router: PropTypes.object.isRequired,
    };

    componentDidMount() {
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
      if (!this.props.isAuthenticated) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default authenticatedComponent;

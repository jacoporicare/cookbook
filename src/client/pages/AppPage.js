import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { resetErrorMessage } from '../components/ErrorMessage/actions';
import { fetchUser } from '../components/Navbar/actions';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

class AppPage extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    isFetchingUser: PropTypes.bool,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { isAuthenticated, user, fetchUser } = this.props;

    if (isAuthenticated && !user) {
      fetchUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      errorMessage: oldErrorMessage,
      resetErrorMessage,
      fetchUser,
    } = this.props;
    const { errorMessage } = nextProps;

    if (errorMessage && errorMessage !== oldErrorMessage) {
      toastr.error(errorMessage);
      resetErrorMessage();
    }

    if (nextProps.isAuthenticated && !nextProps.user) {
      fetchUser();
    }
  }

  render() {
    const { isAuthenticated, user, isFetchingUser, children } = this.props;

    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          userName={user ? user.name : null}
          isFetchingUser={isFetchingUser}
        />
        {children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.navbar.user,
  isFetchingUser: state.navbar.isFetchingUser,
});

const mapDispatchToProps = {
  resetErrorMessage,
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);

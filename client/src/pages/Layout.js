import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { resetErrorMessage } from '../components/ErrorMessage/actions';
import { fetchUser } from '../components/Navbar/actions';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    isFetchingUser: PropTypes.bool,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchUserError: PropTypes.bool,
  };

  componentDidMount() {
    const { isAuthenticated, user, fetchUser } = this.props;

    if (isAuthenticated && !user) {
      fetchUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errorMessage: oldErrorMessage, resetErrorMessage, fetchUser } = this.props;
    const { errorMessage, isAuthenticated, user, isFetchingUser, fetchUserError } = nextProps;

    if (errorMessage && errorMessage !== oldErrorMessage) {
      toastr.error(errorMessage);
      resetErrorMessage();
    }

    if (isAuthenticated && !user && !isFetchingUser && !fetchUserError) {
      fetchUser();
    }
  }

  render() {
    const { isAuthenticated, user, isFetchingUser, children } = this.props;

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          userName={user ? user.name : null}
          isFetchingUser={isFetchingUser}
        />
        {isAuthenticated && <Navbar />}
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
  fetchUserError: state.navbar.error,
});

const mapDispatchToProps = {
  resetErrorMessage,
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

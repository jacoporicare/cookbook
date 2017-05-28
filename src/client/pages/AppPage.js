import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { resetErrorMessage } from '../components/ErrorMessage/actions';
import { getCurrentUser } from '../actions/userActions';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

class AppPage extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    userName: PropTypes.string,
    isFetchingUser: PropTypes.bool,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (this.props.isAuthenticated && !this.props.userName) {
      this.props.getCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errorMessage: oldErrorMessage, resetErrorMessage } = this.props;
    const { errorMessage } = nextProps;

    if (errorMessage && errorMessage !== oldErrorMessage) {
      toastr.error(errorMessage);
      resetErrorMessage();
    }

    if (nextProps.isAuthenticated && !nextProps.userName) {
      this.props.getCurrentUser();
    }
  }

  render() {
    const { isAuthenticated, userName, isFetchingUser, children } = this.props;

    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          userName={userName}
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
  userName: state.user.currentUser.name,
  isFetchingUser: state.user.currentUser.isFetching,
});

const mapDispatchToProps = {
  resetErrorMessage,
  getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);

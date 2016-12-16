import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { resetErrorMessage } from '../actions/errorMessageActions';
import { getCurrentUser } from '../actions/authActions';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

class AppPage extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated && !this.props.userName) {
      this.props.getCurrentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      errorMessage: oldErrorMessage,
      resetErrorMessage
    } = this.props;
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

AppPage.propTypes = {
  children: PropTypes.element,
  isAuthenticated: PropTypes.bool,
  userName: PropTypes.string,
  isFetchingUser: PropTypes.bool,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { errorMessage, auth } = state;

  return {
    errorMessage,
    isAuthenticated: auth.isAuthenticated,
    userName: auth.user.name,
    isFetchingUser: auth.user.isFetching
  };
};

export default connect(mapStateToProps, {
  resetErrorMessage,
  getCurrentUser
})(AppPage);

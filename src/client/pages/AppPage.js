import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from '../actions/errorMessageActions';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

class AppPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      errorMessage: oldErrorMessage,
      resetErrorMessage
    } = this.props;
    const { errorMessage } = nextProps;

    if (errorMessage && errorMessage !== oldErrorMessage) {
      alert(errorMessage);
      resetErrorMessage();
    }
  }

  render() {
    return (
      <div>
        <Navbar isLoggedIn={false} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

AppPage.propTypes = {
  children: PropTypes.element,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorMessage: state.errorMessage
});

export default connect(mapStateToProps, {
  resetErrorMessage
})(AppPage);

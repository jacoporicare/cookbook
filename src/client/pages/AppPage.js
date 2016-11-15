import React, { PropTypes } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AppPage = ({ children }) => {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      {children}
      <Footer />
    </div>
  );
};

AppPage.propTypes = {
  children: PropTypes.element
};

export default AppPage;

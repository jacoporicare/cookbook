import React, { PropTypes } from 'react';
import Navbar from '../components/Navbar/Navbar';

const AppPage = ({ children }) => {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      {children}
    </div>
  );
};

AppPage.propTypes = {
  children: PropTypes.element
};

export default AppPage;

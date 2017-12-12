import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import './UserInfo.module.css';

const UserInfo = ({ userName, isFetchingUser }) => (
  <div>
    {isFetchingUser ? (
      <i className="fa fa-spin fa-spinner" />
    ) : (
      <span>
        <i className="fa fa-user" /> {userName}
      </span>
    )}
    <Link to="/odhlaseni" styleName="sign-out">
      Odhlásit
    </Link>
  </div>
);

UserInfo.propTypes = {
  userName: PropTypes.string,
  isFetchingUser: PropTypes.bool,
};

export default UserInfo;

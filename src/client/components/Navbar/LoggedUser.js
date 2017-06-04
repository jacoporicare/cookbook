import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import NavItem from '../NavItem/NavItem';

const LoggedUser = ({ isFetching, userName }) =>
  <div>
    <ul className="nav navbar-nav">
      <NavItem to="/prilohy">Přílohy</NavItem>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li>
        <a>
          {isFetching
            ? <i className="fa fa-spin fa-spinner" />
            : <span><i className="fa fa-user" /> {userName}</span>}
        </a>
      </li>
      <li><Link to="/odhlaseni">Odhlásit</Link></li>
    </ul>
  </div>;

LoggedUser.propTypes = {
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default LoggedUser;

import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import NavItem from '../NavItem/NavItem';
// import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userName, isAuthenticated, isFetchingUser }) => (
  <div className="navbar navbar-default">
    <div className="container">

      <div className="navbar-header">
        <button className="navbar-toggle" type="button">
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <IndexLink to="/" className="navbar-brand">Žrádelník</IndexLink>
      </div>

      <div className="navbar-collapse collapse" id="navbar-main">
        {isAuthenticated &&
          <ul className="nav navbar-nav">
            <NavItem to="/prilohy">Přílohy</NavItem>
          </ul>
        }

        {/* isAuthenticated && <SearchBar /> */}

        {isAuthenticated &&
          <ul className="nav navbar-nav navbar-right">
            <li><a>{isFetchingUser ? <i className="fa fa-spin fa-spinner" /> : <span><i className="fa fa-user" /> {userName}</span>}</a></li>
            <li><Link to="/odhlaseni">Odhlásit</Link></li>
          </ul>
        }

      </div>

    </div>
  </div>
);

Navbar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isFetchingUser: PropTypes.bool
};

export default Navbar;

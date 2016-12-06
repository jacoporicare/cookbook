import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ username, isLoggedIn }) => (
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
        <ul className="nav navbar-nav">
          <li><Link to="/prilohy" activeClassName="active">Přílohy</Link></li>
        </ul>

        {isLoggedIn && <SearchBar />}

        <ul className="nav navbar-nav navbar-right">
          {!isLoggedIn && <li><Link to="/prihlaseni" activeClassName="active">Přihlásit</Link></li>}
          {isLoggedIn && <li><a><i className="fa fa-user" /> {username}</a></li>}
          {isLoggedIn && <li><Link to="/odhlaseni">Odhlásit</Link></li>}
        </ul>

      </div>

    </div>
  </div>
);

Navbar.propTypes = {
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
};

export default Navbar;

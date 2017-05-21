import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import NavItem from '../NavItem/NavItem';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  handleCollapseToggle = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  }

  render() {
    const { userName, isAuthenticated, isFetchingUser } = this.props;
    const { collapsed } = this.state;

    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">

          <div className="navbar-header">
            <button className="navbar-toggle" type="button" onClick={this.handleCollapseToggle}>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <IndexLink to="/" className="navbar-brand">Žrádelník</IndexLink>
          </div>

          <div className={`navbar-collapse ${collapsed ? 'collapse' : ''}`} id="navbar-main">
            {isAuthenticated &&
              <div>
                <ul className="nav navbar-nav">
                  <NavItem to="/prilohy">Přílohy</NavItem>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a>
                      {isFetchingUser ?
                        <i className="fa fa-spin fa-spinner" /> :
                        <span><i className="fa fa-user" /> {userName}</span>
                      }
                    </a>
                  </li>
                  <li><Link to="/odhlaseni">Odhlásit</Link></li>
                </ul>
              </div>
            }
          </div>

        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isFetchingUser: PropTypes.bool,
};

export default Navbar;

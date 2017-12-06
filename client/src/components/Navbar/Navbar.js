import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import LoggedUser from './LoggedUser';

class Navbar extends Component {
  static propTypes = {
    userName: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isFetchingUser: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  handleCollapseToggle = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };

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
            <IndexLink to="/" className="navbar-brand">
              Žrádelník
            </IndexLink>
          </div>

          <div className={`navbar-collapse ${collapsed ? 'collapse' : ''}`} id="navbar-main">
            {isAuthenticated && <LoggedUser isFetching={isFetchingUser} userName={userName} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

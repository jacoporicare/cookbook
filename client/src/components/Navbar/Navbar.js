import React, { Component } from 'react';

import NavItem from '../NavItem/NavItem';

class Navbar extends Component {
  state = {
    collapsed: true,
  };

  handleCollapseToggle = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" onClick={this.handleCollapseToggle}>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>

          <div className={`navbar-collapse ${collapsed ? 'collapse' : ''}`} id="navbar-main">
            <ul className="nav navbar-nav">
              <NavItem to="/" index>
                Recepty
              </NavItem>
              <NavItem to="/prilohy">Přílohy</NavItem>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import { InjectedRouter } from 'react-router';

import NavItem from '../NavItem/NavItem';

type Props = {
  router: InjectedRouter;
};

type State = {
  collapsed: boolean;
};

export class Navbar extends Component<Props, State> {
  state = {
    collapsed: true,
  };

  handleCollapseToggle = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
  };

  render() {
    const { router } = this.props;
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
              <NavItem to="/" isActive={router.isActive('/', true)} index>
                Recepty
              </NavItem>
              <NavItem to="/prilohy" isActive={router.isActive('/prilohy')}>
                Přílohy
              </NavItem>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

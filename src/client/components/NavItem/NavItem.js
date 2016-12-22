import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const NavItem = ({ index, onlyActiveOnIndex, to, activeClassName, children, ...props }, { router }) => {
  const isActive = router.isActive(to, onlyActiveOnIndex);
  const LinkComponent = index ? Link : IndexLink;

  return (
    <li className={isActive ? (activeClassName || 'active') : ''}>
      <LinkComponent to={to} {...props}>{children}</LinkComponent>
    </li>
  );
};

NavItem.propTypes = {
  index: PropTypes.bool,
  onlyActiveOnIndex: PropTypes.bool,
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  children: PropTypes.node
};

NavItem.contextTypes = {
  router: PropTypes.object.isRequired
};

export default NavItem;

import React from 'react';
import { Link, IndexLink } from 'react-router';

type Props = {
  index?: boolean;
  to: string;
  isActive: boolean;
  activeClassName?: string;
  children?: React.ReactNode;
};

const NavItem = ({ index, to, isActive, activeClassName, children, ...props }: Props) => {
  const LinkComponent = !index ? Link : IndexLink;

  return (
    <li className={isActive ? activeClassName || 'active' : ''}>
      <LinkComponent to={to} {...props}>
        {children}
      </LinkComponent>
    </li>
  );
};

export default NavItem;

import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { colors, theme } from '../../styles/colors';

type Props = LinkProps & {
  activeHref?: string;
  children: React.ReactNode;
};

function NavLink({ activeHref, children, ...linkProps }: Props) {
  const router = useRouter();

  return (
    <>
      <Link {...linkProps}>
        <a
          className={classNames('nav-item link', {
            active: router.pathname === (activeHref || linkProps.href.toString()),
          })}
        >
          {children}
        </a>
      </Link>
      <style jsx>{`
        .nav-item {
          color: ${colors.gray600};
          font-size: 20px;
          font-weight: 300;
          padding: 4px 8px;
          white-space: nowrap;
        }

        @media (min-width: 1024px) {
          .nav-item {
            padding: 8px;
          }
        }

        .link {
          display: block;
          color: white;
          text-decoration: none;
        }

        .link::after {
          content: '';
          display: block;
          width: 100%;
          margin-top: 4px;
          height: 4px;
          transition: transform 250ms ease;
          transform: scaleX(0);
          background-color: ${theme.primary};
        }

        .link:hover::after {
          transform: scaleX(1);
        }

        .link:hover {
          color: white;
          text-decoration: none;
        }

        .link.active::after {
          transform: scaleX(1) !important;
        }
      `}</style>
    </>
  );
}

export default NavLink;

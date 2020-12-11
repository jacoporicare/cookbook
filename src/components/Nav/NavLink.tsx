import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { colors, theme } from '../../styles/colors';

type Props = LinkProps & {
  activeHref?: string;
  children: React.ReactNode;
};

const useStyles = makeStyles({
  navItem: {
    color: colors.gray600,
    fontSize: '20px',
    fontWeight: 300,
    padding: '4px 8px',
    whiteSpace: 'nowrap',
  },
  '@media (min-width: 1024px)': {
    navItem: {
      padding: '8px',
    },
  },
  link: {
    display: 'block',
    color: 'white',
    textDecoration: 'none',

    '&::after': {
      content: "''",
      display: 'block',
      width: '100%',
      marginTop: '4px',
      height: '4px',
      transition: 'transform 250ms ease',
      transform: 'scaleX(0)',
      backgroundColor: theme.primary,
    },

    '&:hover': {
      color: 'white',
      textDecoration: 'none',

      '&::after': {
        transform: 'scaleX(1)',
      },
    },

    '&$active::after': {
      transform: 'scaleX(1) !important',
    },
  },
  active: {},
});

function NavLink({ activeHref, children, ...linkProps }: Props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Link {...linkProps}>
      <a
        className={classNames(classes.navItem, classes.link, {
          [classes.active]: router.pathname === (activeHref || linkProps.href.toString()),
        })}
      >
        {children}
      </a>
    </Link>
  );
}

export default NavLink;

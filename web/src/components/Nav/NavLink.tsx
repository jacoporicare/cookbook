import { styled } from '@mui/material';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type Props = LinkProps & {
  active?: boolean;
  children: ReactNode;
};

const StyledLink = styled('a', { shouldForwardProp: propName => propName !== 'active' })<{
  active?: boolean;
}>(({ active, theme }) => [
  {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 300,
    padding: '4px 8px',
    whiteSpace: 'nowrap',

    '@media (min-width: 1024px)': {
      padding: '8px',
    },

    '&::after': {
      content: "''",
      display: 'block',
      width: '100%',
      marginTop: '4px',
      height: '4px',
      transition: 'transform 250ms ease',
      transform: 'scaleX(0)',
      backgroundColor: theme.palette.primary.main,
    },

    '&:hover': {
      color: 'white',
      textDecoration: 'none',

      '&::after': {
        transform: 'scaleX(1)',
      },
    },
  },
  active && {
    '&::after': {
      transform: 'scaleX(1) !important',
    },
  },
]);

function NavLink({ active, children, ...linkProps }: Props) {
  return (
    <Link {...linkProps} passHref>
      <StyledLink active={active}>{children}</StyledLink>
    </Link>
  );
}

export default NavLink;

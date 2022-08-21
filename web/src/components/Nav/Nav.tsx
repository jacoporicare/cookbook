import { Box, styled } from '@mui/material';

import { colors } from '../../styles/colors';
import UserInfo from '../UserInfo';

import NavLink from './NavLink';

const PREFIX = 'Nav';

const classes = {
  input: `${PREFIX}-input`,
  label: `${PREFIX}-label`,
  part1: `${PREFIX}-part1`,
  part2: `${PREFIX}-part2`,
  part3: `${PREFIX}-part3`,
};

const Root = styled('div')({
  [`& .${classes.input}`]: {
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    display: 'none',

    '&:checked': {
      '& ~ nav': {
        transform: 'translateX(0)',
        boxShadow: 'rgba(0, 0, 0, 0.25) -16px 0 32px',
      },
      [`& ~ .${classes.label}`]: {
        [`& > .${classes.part1}`]: {
          transform: 'rotate(135deg)',
          marginTop: '7px',
        },
        [`& > .${classes.part2}`]: {
          opacity: 0,
        },
        [`& > .${classes.part3}`]: {
          transform: 'rotate(-135deg)',
          marginTop: '-9px',
        },
      },
    },
  },
  [`& .${classes.label}`]: {
    flexShrink: 0,
    display: 'block',
    cursor: 'pointer',
    height: '22px',
    width: '22px',
    marginTop: '8px',
    marginLeft: '8px',
    transition: 'all 0.3s',

    '& > div': {
      height: '3px',
      width: '100%',
      backgroundColor: '#fff',
      transition: 'all 0.3s',
    },

    '@media (min-width: 1024px)': {
      display: 'none',
    },
  },
  [`& .${classes.part1}`]: {},
  [`& .${classes.part2}`]: {
    marginTop: '3px',
  },
  [`& .${classes.part3}`]: {
    marginTop: '3px',
  },
});

type Props = {
  showUserInfo?: boolean;
};

function Nav(props: Props) {
  return (
    <Root>
      <input className={classes.input} id="openSidebarMenu" type="checkbox" />
      <label className={classes.label} htmlFor="openSidebarMenu">
        <div className={classes.part1} />
        <div className={classes.part2} />
        <div className={classes.part3} />
      </label>
      <Box
        component="nav"
        sx={{
          '@media (max-width: 1023px)': {
            position: 'fixed',
            top: '57px',
            right: 0,
            width: '250px',
            height: '100%',
            transform: 'translateX(250px)',
            transition: 'transform 250ms ease-in-out',
            background: colors.gray900,
          },
          '@media (min-width: 1024px)': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <NavLink href="/">Recepty</NavLink>
        <NavLink href="/prilohy">Přílohy</NavLink>
        {props.showUserInfo && <UserInfo />}
      </Box>
    </Root>
  );
}

export default Nav;

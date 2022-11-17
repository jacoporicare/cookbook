import { ExitToApp } from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

import { useAuth } from '../../AuthContext';
import { colors } from '../../styles/colors';
import NavLink from '../Nav/NavLink';

type Props = {
  userName?: string;
  isUserLoading?: boolean;
  isUserAdmin?: boolean;
};

function UserInfo(props: Props) {
  const [token] = useAuth();
  const router = useRouter();

  return (
    <>
      {props.isUserAdmin && <NavLink href="/admin">Admin</NavLink>}
      <Box
        sx={{
          color: colors.gray600,
          fontSize: '20px',
          fontWeight: 300,
          padding: '4px 0',
          whiteSpace: 'nowrap',
          '@media (max-width: 1023px)': {
            borderTop: `1px solid ${colors.gray600}`,
            height: 0,
            overflow: 'hidden',
          },
          '@media (min-width: 1024px)': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        ·
      </Box>
      {!token ? (
        <NavLink
          active={router.pathname === '/prihlaseni'}
          href={
            !router.asPath || router.asPath.startsWith('/prihlaseni')
              ? '/prihlaseni'
              : `/prihlaseni?u=${router.asPath || ''}`
          }
        >
          Přihlásit
        </NavLink>
      ) : (
        <>
          {props.isUserLoading ? (
            <Box
              sx={{
                color: colors.gray600,
                fontSize: '20px',
                fontWeight: 300,
                padding: '4px 8px',
                whiteSpace: 'nowrap',
                '@media (min-width: 1024px)': {
                  padding: '8px',
                },
              }}
            >
              <CircularProgress size="1.5rem" />
            </Box>
          ) : (
            <NavLink href="/nastaveni">{props.userName}</NavLink>
          )}
          <NavLink href={`/odhlaseni?u=${router.asPath || ''}`}>
            <ExitToApp fontSize="inherit" />{' '}
            <Box
              component="span"
              sx={{
                '@media (min-width: 1024px)': {
                  display: 'none',
                },
              }}
            >
              Odhlásit
            </Box>
          </NavLink>
        </>
      )}
    </>
  );
}

export default UserInfo;

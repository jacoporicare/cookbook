'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  GlobalStyles,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { loginAction, LoginState } from '@/app/actions/auth';
import Layout from '@/components/Layout';
import PageHeading from '@/components/common/PageHeading';
import Spinner from '@/components/common/Spinner';

const initialState: LoginState = {};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri');
  const returnUrl = searchParams.get('u');

  const [state, formAction, pending] = useActionState(loginAction, initialState);

  // Handle WebView redirect (needs client-side window.location)
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  const isForWebView = !!redirectUri;

  const content = (
    <Box p={isForWebView ? 5 : 3}>
      {isForWebView && (
        <Box alignItems="center" component="header" display="flex" flexDirection="column" mb={3}>
          <Box alignItems="center" display="flex">
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <Typography fontSize="1.5rem" fontWeight={400} ml={1} variant="h1">
              Žrádelník
            </Typography>
          </Box>
        </Box>
      )}
      {state.error && (
        <Box mb={3}>
          <Alert severity="error">{state.error}</Alert>
        </Box>
      )}
      <form action={formAction}>
        {/* Hidden fields for redirect handling */}
        {redirectUri && <input type="hidden" name="redirect_uri" value={redirectUri} />}
        {returnUrl && <input type="hidden" name="return_url" value={returnUrl} />}

        <Grid direction="column" spacing={3} container>
          <Grid item>
            <TextField
              inputProps={{
                autoCapitalize: 'off',
                autoComplete: 'username',
                autoCorrect: 'off',
              }}
              label="Uživatel"
              name="username"
              variant="filled"
              fullWidth
              required
              error={!!state.fieldErrors?.username}
              helperText={state.fieldErrors?.username?.[0]}
            />
          </Grid>
          <Grid item>
            <TextField
              inputProps={{
                autoComplete: 'current-password',
              }}
              label="Heslo"
              name="password"
              type="password"
              variant="filled"
              fullWidth
              required
              error={!!state.fieldErrors?.password}
              helperText={state.fieldErrors?.password?.[0]}
            />
          </Grid>
          <Grid item>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              {!isForWebView && (
                <FormControlLabel
                  control={<Checkbox color="primary" name="rememberMe" defaultChecked />}
                  label="Neodhlašovat"
                />
              )}
              <Button
                color="primary"
                disabled={pending}
                fullWidth={isForWebView}
                size={isForWebView ? 'large' : 'medium'}
                type="submit"
                variant="contained"
              >
                Přihlásit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

  const formContent = (
    <>
      {pending && <Spinner overlay />}
      <Box maxWidth="28rem" mx="auto" px={isForWebView ? 0 : 3}>
        {isForWebView ? (
          content
        ) : (
          <>
            <PageHeading>Přihlášení</PageHeading>
            <Card>{content}</Card>
          </>
        )}
      </Box>
      {isForWebView && (
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: 'white',
            },
          }}
        />
      )}
    </>
  );

  if (isForWebView) {
    return formContent;
  }

  return <Layout static>{formContent}</Layout>;
}

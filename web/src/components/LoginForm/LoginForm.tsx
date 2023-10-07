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
import { ChangeEventHandler, FormEventHandler } from 'react';

import PageHeading from '../common/PageHeading';
import Spinner from '../common/Spinner';

type Props = {
  username: string;
  password: string;
  rememberMe: boolean;
  isForWebView?: boolean;
  isSubmitting: boolean;
  error: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function LoginForm(props: Props) {
  const content = (
    <Box p={props.isForWebView ? 5 : 3}>
      {props.isForWebView && (
        <Box alignItems="center" component="header" display="flex" flexDirection="column" mb={3}>
          <Box alignItems="center" display="flex">
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <Typography fontSize="1.5rem" fontWeight={400} ml={1} variant="h1">
              Žrádelník
            </Typography>
          </Box>
        </Box>
      )}
      {props.error && (
        <Box mb={3}>
          <Alert severity="error">Neplatné uživatelské jméno nebo heslo.</Alert>
        </Box>
      )}
      <form onSubmit={props.onSubmit}>
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
              value={props.username}
              variant="filled"
              fullWidth
              required
              onChange={props.onChange}
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
              value={props.password}
              variant="filled"
              fullWidth
              required
              onChange={props.onChange}
            />
          </Grid>
          <Grid item>
            <Box alignItems="center" display="flex" justifyContent="space-between">
              {!props.isForWebView && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.rememberMe}
                      color="primary"
                      name="rememberMe"
                      onChange={props.onChange}
                    />
                  }
                  label="Neodhlašovat"
                />
              )}
              <Button
                color="primary"
                disabled={props.isSubmitting}
                fullWidth={props.isForWebView}
                size={props.isForWebView ? 'large' : 'medium'}
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

  return (
    <>
      {props.isSubmitting && <Spinner overlay />}
      <Box maxWidth="28rem" mx="auto" px={props.isForWebView ? 0 : 3}>
        {props.isForWebView ? (
          content
        ) : (
          <>
            <PageHeading>Přihlášení</PageHeading>
            <Card>{content}</Card>
          </>
        )}
      </Box>
      {props.isForWebView && (
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
}

export default LoginForm;

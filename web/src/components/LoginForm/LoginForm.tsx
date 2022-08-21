import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { ChangeEventHandler, FormEventHandler } from 'react';

import PageHeading from '../common/PageHeading';
import Spinner from '../common/Spinner';

type Props = {
  username: string;
  password: string;
  rememberMe: boolean;
  isSubmitting: boolean;
  error: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function LoginForm(props: Props) {
  return (
    <>
      {props.isSubmitting && <Spinner overlay />}
      <Box maxWidth="28rem" mx="auto">
        <PageHeading>Přihlášení</PageHeading>
        <Card>
          <Box p={3}>
            {props.error && <Alert severity="error">Neplatné uživatelské jméno nebo heslo.</Alert>}
            <form onSubmit={props.onSubmit}>
              <Grid direction="column" spacing={3} container>
                <Grid item>
                  <TextField
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
                    <Button
                      color="primary"
                      disabled={props.isSubmitting}
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
        </Card>
      </Box>
    </>
  );
}

export default LoginForm;

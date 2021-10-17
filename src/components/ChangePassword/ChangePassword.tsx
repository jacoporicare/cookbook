import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

import Spinner from '../common/Spinner';

type Props = {
  invalidPassword?: boolean;
  newPassword?: string;
  newPasswordConfirm?: string;
  password?: string;
  submitting: boolean;
  onInvalidPasswordChange: (value: boolean) => void;
  onNewPasswordChange: (value: string) => void;
  onNewPasswordConfirmChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

function ChangePassword(props: Props) {
  return (
    <>
      {props.submitting && <Spinner overlay />}
      <Typography component="h3" variant="h4" gutterBottom>
        Změna hesla
      </Typography>
      <form onSubmit={props.onSubmit}>
        <Box maxWidth="400px">
          <Grid direction="column" spacing={3} container>
            <Grid item>
              <TextField
                error={props.password === ''}
                label="Současné heslo"
                name="password"
                type="password"
                value={props.password || ''}
                variant="filled"
                fullWidth
                required
                onChange={e => {
                  props.onPasswordChange(e.currentTarget.value);
                  props.onInvalidPasswordChange(false);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                error={props.newPassword === ''}
                label="Nové heslo"
                name="newPassword"
                type="password"
                value={props.newPassword || ''}
                variant="filled"
                fullWidth
                required
                onChange={e => props.onNewPasswordChange(e.currentTarget.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                error={props.newPasswordConfirm === ''}
                label="Potvrďte nové heslo"
                name="newPasswordConfirm"
                type="password"
                value={props.newPasswordConfirm || ''}
                variant="filled"
                fullWidth
                required
                onChange={e => props.onNewPasswordConfirmChange(e.currentTarget.value)}
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                disabled={
                  props.submitting ||
                  !props.password ||
                  !props.newPassword ||
                  !props.newPasswordConfirm ||
                  props.newPassword !== props.newPasswordConfirm
                }
                type="submit"
                variant="contained"
              >
                Změnit heslo
              </Button>
            </Grid>
            {props.invalidPassword && (
              <Grid item>
                <Alert severity="error">Neplatné současné heslo.</Alert>
              </Grid>
            )}
            {(props.newPassword || '') !== (props.newPasswordConfirm || '') && (
              <Grid item>
                <Alert severity="error">Nová hesla se neshodují.</Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default ChangePassword;

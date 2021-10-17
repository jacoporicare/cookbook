import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

import { useChangePasswordMutation } from '../../generated/graphql';

import ChangePassword from './ChangePassword';

function ChangePasswordContainer() {
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>();
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const [changePassword, { loading: submitting }] = useChangePasswordMutation({
    onCompleted: data => {
      if (data.changePassword) {
        setSuccessOpen(true);
        setPassword(undefined);
        setNewPassword(undefined);
        setNewPasswordConfirm(undefined);
      } else {
        setInvalidPassword(true);
      }
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!password || !newPassword || newPassword !== newPasswordConfirm) {
      return;
    }

    changePassword({ variables: { password, newPassword } });
  }

  return (
    <>
      <ChangePassword
        invalidPassword={invalidPassword}
        newPassword={newPassword}
        newPasswordConfirm={newPasswordConfirm}
        password={password}
        submitting={submitting}
        onInvalidPasswordChange={setInvalidPassword}
        onNewPasswordChange={setNewPassword}
        onNewPasswordConfirmChange={setNewPasswordConfirm}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
      <Snackbar autoHideDuration={5000} open={successOpen} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Heslo změněno!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ChangePasswordContainer;

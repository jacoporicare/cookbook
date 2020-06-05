import React, { useState } from 'react';
import { notify } from 'react-notify-toast';

import { useChangePasswordMutation } from '../../generated/graphql';

import ChangePassword from './ChangePassword';

function ChangePasswordContainer() {
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>();
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [changePassword, { loading: submitting }] = useChangePasswordMutation({
    onCompleted: data => {
      if (data.changePassword) {
        notify.show('Heslo změněno', 'success');
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
  );
}

export default ChangePasswordContainer;

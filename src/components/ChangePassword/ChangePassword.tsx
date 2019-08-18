import React, { useState } from 'react';
import gql from 'graphql-tag';

import Spinner from '../common/Spinner';
import { Box } from '../core';
import { DangerAlert, Input, Label, SuccessButton } from '../elements';
import { useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';

const MUTATION = gql`
  mutation ChangePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword)
  }
`;

type Data = {
  changePassword: boolean;
};

type Variables = {
  password: string;
  newPassword: string;
};

function ChangePassword() {
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>();
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [changePassword, { loading: submitting }] = useMutation<Data, Variables>(MUTATION, {
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
    <>
      {submitting && <Spinner overlay />}
      <h2>Změna hesla</h2>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={400}>
          <Box mb={3}>
            <Label htmlFor="password">Současné heslo</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password || ''}
              onChange={e => {
                setPassword(e.currentTarget.value);
                setInvalidPassword(false);
              }}
              hasError={password === ''}
              required
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPassword">Nové heslo</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword || ''}
              onChange={e => setNewPassword(e.currentTarget.value)}
              hasError={newPassword === ''}
              required
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPasswordConfirm">Potvrďte nové heslo</Label>
            <Input
              type="password"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              value={newPasswordConfirm || ''}
              onChange={e => setNewPasswordConfirm(e.currentTarget.value)}
              hasError={newPasswordConfirm === ''}
              required
            />
          </Box>
          <Box>
            <SuccessButton
              type="submit"
              disabled={
                submitting ||
                !password ||
                !newPassword ||
                !newPasswordConfirm ||
                newPassword !== newPasswordConfirm
              }
            >
              Změnit heslo
            </SuccessButton>
          </Box>
        </Box>
        {invalidPassword && <DangerAlert mt={3}>Neplatné současné heslo.</DangerAlert>}
        {(newPassword || '') !== (newPasswordConfirm || '') && (
          <DangerAlert mt={3}>Nová hesla se neshodují.</DangerAlert>
        )}
      </form>
    </>
  );
}

export default ChangePassword;

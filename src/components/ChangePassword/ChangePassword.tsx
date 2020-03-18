import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { notify } from 'react-notify-toast';

import Spinner from '../common/Spinner';
import { Box } from '../core';
import { DangerAlert, Input, Label, SuccessButton } from '../elements';

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
              hasError={password === ''}
              id="password"
              name="password"
              type="password"
              value={password || ''}
              required
              onChange={e => {
                setPassword(e.currentTarget.value);
                setInvalidPassword(false);
              }}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPassword">Nové heslo</Label>
            <Input
              hasError={newPassword === ''}
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword || ''}
              required
              onChange={e => setNewPassword(e.currentTarget.value)}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPasswordConfirm">Potvrďte nové heslo</Label>
            <Input
              hasError={newPasswordConfirm === ''}
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              type="password"
              value={newPasswordConfirm || ''}
              required
              onChange={e => setNewPasswordConfirm(e.currentTarget.value)}
            />
          </Box>
          <Box>
            <SuccessButton
              disabled={
                submitting ||
                !password ||
                !newPassword ||
                !newPasswordConfirm ||
                newPassword !== newPasswordConfirm
              }
              type="submit"
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

import React from 'react';

import Spinner from '../common/Spinner';
import { Box } from '../core';
import { DangerAlert, Input, Label, SuccessButton } from '../elements';

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
      <h2>Změna hesla</h2>
      <form onSubmit={props.onSubmit}>
        <Box maxWidth={400}>
          <Box mb={3}>
            <Label htmlFor="password">Současné heslo</Label>
            <Input
              hasError={props.password === ''}
              id="password"
              name="password"
              type="password"
              value={props.password || ''}
              required
              onChange={e => {
                props.onPasswordChange(e.currentTarget.value);
                props.onInvalidPasswordChange(false);
              }}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPassword">Nové heslo</Label>
            <Input
              hasError={props.newPassword === ''}
              id="newPassword"
              name="newPassword"
              type="password"
              value={props.newPassword || ''}
              required
              onChange={e => props.onNewPasswordChange(e.currentTarget.value)}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="newPasswordConfirm">Potvrďte nové heslo</Label>
            <Input
              hasError={props.newPasswordConfirm === ''}
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              type="password"
              value={props.newPasswordConfirm || ''}
              required
              onChange={e => props.onNewPasswordConfirmChange(e.currentTarget.value)}
            />
          </Box>
          <Box>
            <SuccessButton
              disabled={
                props.submitting ||
                !props.password ||
                !props.newPassword ||
                !props.newPasswordConfirm ||
                props.newPassword !== props.newPasswordConfirm
              }
              type="submit"
            >
              Změnit heslo
            </SuccessButton>
          </Box>
        </Box>
        {props.invalidPassword && <DangerAlert mt={3}>Neplatné současné heslo.</DangerAlert>}
        {(props.newPassword || '') !== (props.newPasswordConfirm || '') && (
          <DangerAlert mt={3}>Nová hesla se neshodují.</DangerAlert>
        )}
      </form>
    </>
  );
}

export default ChangePassword;

import React, { ChangeEventHandler, FormEventHandler } from 'react';

import Checkbox from '../common/Checkbox';
import Lead from '../common/Lead';
import PageHeading from '../common/PageHeading';
import Spinner from '../common/Spinner';
import { Box } from '../core';
import { DangerAlert, Input, Label, SuccessButton } from '../elements';

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
      <PageHeading>Přihlášení</PageHeading>
      <Lead>Zadej své uživatelské jméno a heslo.</Lead>
      {props.error && <DangerAlert>Neplatné uživatelské jméno nebo heslo.</DangerAlert>}
      <form onSubmit={props.onSubmit}>
        <Box maxWidth={400}>
          <Box mb={3}>
            <Label htmlFor="username">Uživatel</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={props.username}
              onChange={props.onChange}
              required
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="password">Heslo</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={props.password}
              onChange={props.onChange}
              required
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={props.rememberMe}
              onChange={props.onChange}
            >
              Neodhlašovat
            </Checkbox>
            <SuccessButton type="submit" disabled={props.isSubmitting}>
              Přihlásit
            </SuccessButton>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;

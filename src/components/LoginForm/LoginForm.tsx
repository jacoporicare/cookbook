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
              id="username"
              name="username"
              type="text"
              value={props.username}
              required
              onChange={props.onChange}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={props.password}
              required
              onChange={props.onChange}
            />
          </Box>
          <Box alignItems="center" display="flex" justifyContent="space-between">
            <Checkbox
              checked={props.rememberMe}
              id="rememberMe"
              name="rememberMe"
              onChange={props.onChange}
            >
              Neodhlašovat
            </Checkbox>
            <SuccessButton disabled={props.isSubmitting} type="submit">
              Přihlásit
            </SuccessButton>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;

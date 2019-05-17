import React, { ChangeEventHandler, FormEventHandler } from 'react';

import { Box } from '../core';
import { Input, Label, SuccessButton } from '../elements';
import Spinner from '../common/Spinner';
import PageHeading from '../common/PageHeading';
import Lead from '../common/Lead';
import Checkbox from '../common/Checkbox';

type Props = {
  username: string;
  password: string;
  rememberMe: boolean;
  isSubmitting: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function LoginForm({ username, password, rememberMe, isSubmitting, onChange, onSubmit }: Props) {
  return (
    <>
      {isSubmitting && <Spinner overlay />}
      <PageHeading>Přihlášení</PageHeading>
      <Lead>Zadej své uživatelské jméno a heslo.</Lead>
      <form onSubmit={onSubmit}>
        <Box maxWidth={400}>
          <Box mb={3}>
            <Label htmlFor="username">Uživatel</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="password">Heslo</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox id="rememberMe" name="rememberMe" checked={rememberMe} onChange={onChange}>
              Neodhlašovat
            </Checkbox>
            <SuccessButton type="submit" disabled={isSubmitting}>
              Přihlásit
            </SuccessButton>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;

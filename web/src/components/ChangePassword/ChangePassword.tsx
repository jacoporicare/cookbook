'use client';

import { useState } from 'react';

import { ChangePasswordState } from '@/app/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PageHeading } from '../common/PageHeading';
import { Spinner } from '../common/Spinner';

type Props = {
  state: ChangePasswordState;
  isPending: boolean;
};

export function ChangePassword({ state, isPending }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const passwordsMatch = newPassword === newPasswordConfirm;

  // Extract errors from conform format
  const formErrors = state.error?.[''];
  const passwordErrors = state.error?.['password'];
  const newPasswordErrors = state.error?.['newPassword'];
  const newPasswordConfirmErrors = state.error?.['newPasswordConfirm'];

  return (
    <>
      {isPending && <Spinner overlay />}
      <div className="max-w-md">
        <PageHeading>Změna hesla</PageHeading>
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Současné heslo</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={passwordErrors ? 'border-destructive' : ''}
                />
                {passwordErrors?.[0] && (
                  <p className="text-sm text-destructive">
                    {passwordErrors[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nové heslo</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className={newPasswordErrors ? 'border-destructive' : ''}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPasswordErrors?.[0] && (
                  <p className="text-sm text-destructive">
                    {newPasswordErrors[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPasswordConfirm">Potvrďte nové heslo</Label>
                <Input
                  id="newPasswordConfirm"
                  name="newPasswordConfirm"
                  type="password"
                  required
                  className={
                    newPasswordConfirmErrors ? 'border-destructive' : ''
                  }
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
                {newPasswordConfirmErrors?.[0] && (
                  <p className="text-sm text-destructive">
                    {newPasswordConfirmErrors[0]}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending || !passwordsMatch}>
                  Změnit heslo
                </Button>
              </div>

              {formErrors?.[0] && (
                <Alert variant="destructive">
                  <AlertDescription>{formErrors[0]}</AlertDescription>
                </Alert>
              )}

              {!passwordsMatch && newPasswordConfirm && (
                <Alert variant="destructive">
                  <AlertDescription>Nová hesla se neshodují.</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

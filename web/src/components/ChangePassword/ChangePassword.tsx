'use client';

import { useEffect, useRef, useState } from 'react';

import { ChangePasswordState } from '@/app/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PageHeading } from '../common/PageHeading';
import { Spinner } from '../common/Spinner';

type Props = {
  state: ChangePasswordState;
  isPending: boolean;
};

export function ChangePassword({ state, isPending }: Props) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const passwordsMatch = newPassword === newPasswordConfirm;

  // Extract errors from conform format
  const formErrors = state.error?.[''];
  const passwordErrors = state.error?.['password'];
  const newPasswordErrors = state.error?.['newPassword'];
  const newPasswordConfirmErrors = state.error?.['newPasswordConfirm'];

  // Reset form on success
  useEffect(() => {
    if (state.status === 'success' && formRef.current) {
      formRef.current.reset();
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
  }, [state.status]);

  return (
    <>
      {isPending && <Spinner overlay />}
      <div className="mx-auto max-w-md">
        <PageHeading>Změna hesla</PageHeading>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Současné heslo</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                required
                className={passwordErrors ? 'border-destructive' : ''}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              {passwordErrors?.[0] && (
                <p className="text-sm text-destructive">{passwordErrors[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nové heslo</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                required
                className={newPasswordErrors ? 'border-destructive' : ''}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
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
                value={newPasswordConfirm}
                required
                className={newPasswordConfirmErrors ? 'border-destructive' : ''}
                onChange={(e) => setNewPasswordConfirm(e.currentTarget.value)}
              />
              {newPasswordConfirmErrors?.[0] && (
                <p className="text-sm text-destructive">
                  {newPasswordConfirmErrors[0]}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !password ||
                  !newPassword ||
                  !newPasswordConfirm ||
                  !passwordsMatch
                }
              >
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
        </Card>
      </div>
    </>
  );
}

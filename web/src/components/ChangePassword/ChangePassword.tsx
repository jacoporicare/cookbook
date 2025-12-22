'use client';

import { useEffect, useRef, useState } from 'react';

import { ChangePasswordState } from '@/app/actions/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import PageHeading from '../common/PageHeading';
import Spinner from '../common/Spinner';

type Props = {
  state: ChangePasswordState;
  isPending: boolean;
};

function ChangePassword({ state, isPending }: Props) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const passwordsMatch = newPassword === newPasswordConfirm;

  // Reset form on success
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
  }, [state.success]);

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
                className={
                  state.fieldErrors?.password ? 'border-destructive' : ''
                }
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              {state.fieldErrors?.password?.[0] && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.password[0]}
                </p>
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
                className={
                  state.fieldErrors?.newPassword ? 'border-destructive' : ''
                }
                onChange={(e) => setNewPassword(e.currentTarget.value)}
              />
              {state.fieldErrors?.newPassword?.[0] && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.newPassword[0]}
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
                className={
                  state.fieldErrors?.newPasswordConfirm
                    ? 'border-destructive'
                    : ''
                }
                onChange={(e) => setNewPasswordConfirm(e.currentTarget.value)}
              />
              {state.fieldErrors?.newPasswordConfirm?.[0] && (
                <p className="text-sm text-destructive">
                  {state.fieldErrors.newPasswordConfirm[0]}
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

            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
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

export default ChangePassword;

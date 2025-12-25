'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { ChangePasswordState, changePasswordAction } from '@/app/actions/auth';

import { ChangePassword } from './ChangePassword';

const initialState: ChangePasswordState = { status: undefined };

export function ChangePasswordContainer() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Heslo změněno!');
    }
  }, [state.status]);

  return (
    <form action={formAction}>
      <ChangePassword state={state} isPending={isPending} />
    </form>
  );
}

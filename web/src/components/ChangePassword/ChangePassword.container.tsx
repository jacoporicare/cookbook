'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { ChangePasswordState, changePasswordAction } from '@/app/actions/auth';

import ChangePassword from './ChangePassword';

const initialState: ChangePasswordState = {};

function ChangePasswordContainer() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success('Heslo změněno!');
    }
  }, [state.success]);

  return (
    <form action={formAction}>
      <ChangePassword state={state} isPending={isPending} />
    </form>
  );
}

export default ChangePasswordContainer;

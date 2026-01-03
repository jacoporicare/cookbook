'use client';

import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { ChangePasswordState, changePasswordAction } from '@/app/actions/auth';

import { ChangePassword } from './ChangePassword';

const initialState: ChangePasswordState = { status: undefined };

export function ChangePasswordContainer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Heslo změněno!');
      formRef.current?.reset();
    }
  }, [state]);

  // Use state object as key to reset component state after successful submission
  return (
    <form ref={formRef} action={formAction}>
      <ChangePassword key={state.status} state={state} isPending={isPending} />
    </form>
  );
}

'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { LoginState, loginAction } from '@/app/actions/auth';
import Layout from '@/components/Layout';
import PageHeading from '@/components/common/PageHeading';
import Spinner from '@/components/common/Spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialState: LoginState = {};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri');
  const returnUrl = searchParams.get('u');

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  // Handle WebView redirect (needs client-side window.location)
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  const isForWebView = !!redirectUri;

  const content = (
    <div className={isForWebView ? 'p-10' : 'p-6'}>
      {isForWebView && (
        <header className="mb-6 flex flex-col items-center">
          <div className="flex items-center">
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <h1 className="ml-2 text-2xl font-normal">Žrádelník</h1>
          </div>
        </header>
      )}
      {state.error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <form action={formAction}>
        {/* Hidden fields for redirect handling */}
        {redirectUri && (
          <input type="hidden" name="redirect_uri" value={redirectUri} />
        )}
        {returnUrl && (
          <input type="hidden" name="return_url" value={returnUrl} />
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Uživatel</Label>
            <Input
              id="username"
              name="username"
              autoCapitalize="off"
              autoComplete="username"
              autoCorrect="off"
              required
              defaultValue={state.values?.username ?? ''}
              className={
                state.fieldErrors?.username ? 'border-destructive' : ''
              }
            />
            {state.fieldErrors?.username?.[0] && (
              <p className="text-sm text-destructive">
                {state.fieldErrors.username[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={
                state.fieldErrors?.password ? 'border-destructive' : ''
              }
            />
            {state.fieldErrors?.password?.[0] && (
              <p className="text-sm text-destructive">
                {state.fieldErrors.password[0]}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {!isForWebView && (
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" name="rememberMe" defaultChecked />
                <Label
                  htmlFor="rememberMe"
                  className="cursor-pointer font-normal"
                >
                  Neodhlašovat
                </Label>
              </div>
            )}
            <Button
              type="submit"
              disabled={pending}
              className={isForWebView ? 'w-full' : ''}
              size={isForWebView ? 'lg' : 'default'}
            >
              Přihlásit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );

  const formContent = (
    <>
      {pending && <Spinner overlay />}
      <div className={`
        mx-auto max-w-md
        ${isForWebView ? '' : 'px-4'}
      `}>
        {isForWebView ? (
          content
        ) : (
          <>
            <PageHeading>Přihlášení</PageHeading>
            <Card>{content}</Card>
          </>
        )}
      </div>
      {isForWebView && <style>{`body { background-color: white; }`}</style>}
    </>
  );

  if (isForWebView) {
    return formContent;
  }

  return <Layout static>{formContent}</Layout>;
}

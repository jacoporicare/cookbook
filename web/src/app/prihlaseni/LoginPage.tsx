'use client';

import Image from 'next/image';
import { useActionState, useEffect } from 'react';

import { LoginState, loginAction } from '@/app/actions/auth';
import { Layout } from '@/components/Layout';
import { PageHeading } from '@/components/common/PageHeading';
import { Spinner } from '@/components/common/Spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RecipeBaseFragment } from '@/generated/graphql';

const initialState: LoginState = { status: undefined };

type Props = {
  recipes: RecipeBaseFragment[];
  redirectUri?: string;
  returnUrl?: string;
};

export function LoginPage({ recipes, redirectUri, returnUrl }: Props) {
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

  // Extract errors from conform format
  const formErrors = state.error?.[''];
  const usernameErrors = state.error?.['username'];
  const passwordErrors = state.error?.['password'];

  const content = (
    <div className={isForWebView ? 'p-10' : undefined}>
      {isForWebView && (
        <header className="mb-6 flex flex-col items-center">
          <div className="flex items-center">
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <h1 className="ml-2 text-2xl font-normal">Žrádelník</h1>
          </div>
        </header>
      )}
      {formErrors?.[0] && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{formErrors[0]}</AlertDescription>
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
              defaultValue={(state.initialValue?.username as string) ?? ''}
              className={usernameErrors ? 'border-destructive' : ''}
            />
            {usernameErrors?.[0] && (
              <p className="text-sm text-destructive">{usernameErrors[0]}</p>
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
              className={passwordErrors ? 'border-destructive' : ''}
            />
            {passwordErrors?.[0] && (
              <p className="text-sm text-destructive">{passwordErrors[0]}</p>
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

      {isForWebView ? (
        <div className="mx-auto max-w-md">{content}</div>
      ) : (
        <div className="max-w-md">
          <PageHeading>Přihlášení</PageHeading>
          <Card>
            <CardContent>{content}</CardContent>
          </Card>
        </div>
      )}
    </>
  );

  if (isForWebView) {
    return formContent;
  }

  return <Layout recipes={recipes}>{formContent}</Layout>;
}

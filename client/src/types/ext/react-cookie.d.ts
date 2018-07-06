declare module 'react-cookie' {
  import * as React from 'react';

  // Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
  type Diff<T extends string, U extends string> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
  type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

  interface CookiesProviderProps {
    children: React.ReactNode;
  }

  export class CookiesProvider extends React.Component<CookiesProviderProps> {}

  interface CookieSetOptions {
    path?: string;
    expires?: Date;
  }

  export interface Cookies {
    get(key: string): string;
    set(key: string, value: string, options?: CookieSetOptions): void;
    remove(key: string): void;
  }

  export interface CookiesProps {
    cookies: Cookies;
  }

  type ComponentConstructor<P> = React.ComponentClass<P> | React.StatelessComponent<P>;

  export function withCookies<P extends CookiesProps>(
    component: ComponentConstructor<P>,
  ): React.ComponentClass<Omit<P, keyof CookiesProps>>;
}

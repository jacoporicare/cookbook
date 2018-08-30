declare module 'react-cookie' {
  import * as React from 'react';

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

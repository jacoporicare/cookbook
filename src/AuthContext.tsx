import React, { useState, useContext } from 'react';

import { setAuthTokenCookie } from './clientAuth';

type ContextValue = [string | null, (token: string | null) => void];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Context = React.createContext<ContextValue>([null, () => {}]);

type Props = {
  children: React.ReactNode;
  token: string | null;
};

export function AuthProvider(props: Props) {
  const [value, setValue] = useState(props.token);

  function set(token: string | null) {
    setAuthTokenCookie(token);
    setValue(token);
  }

  return <Context.Provider value={[value, set]}>{props.children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}

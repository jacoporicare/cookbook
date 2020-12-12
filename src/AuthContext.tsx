import React, { useContext, useState } from 'react';

import { setAuthToken } from './auth';

type ContextValue = [string | undefined, (token?: string) => void];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Context = React.createContext<ContextValue>([undefined, () => {}]);

type Props = {
  children: React.ReactNode;
  token?: string;
};

export function AuthProvider(props: Props) {
  const [value, setValue] = useState(props.token);

  function set(token?: string) {
    setAuthToken(token);
    setValue(token);
  }

  return <Context.Provider value={[value, set]}>{props.children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}

import React, { useState, useContext } from 'react';

import { setAuthToken } from './clientAuth';

type Value = [string, (token: string) => void];

type Props = {
  children: React.ReactNode;
  token: string;
};

const Context = React.createContext<Value>(['', () => {}]);

export function AuthProvider(props: Props) {
  const [value, setValue] = useState(props.token);

  function set(token: string) {
    setAuthToken(token);
    setValue(token);
  }

  return <Context.Provider value={[value, set]}>{props.children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}

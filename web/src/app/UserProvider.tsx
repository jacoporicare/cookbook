'use client';

import { ReactNode, createContext, useContext } from 'react';

type User = {
  name: string;
  isAdmin: boolean;
} | null;

const UserContext = createContext<User>(null);

type Props = {
  user: User;
  children: ReactNode;
};

export function UserProvider({ user, children }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

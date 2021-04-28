import React from 'react';

import { useAuth } from '../../AuthContext';
import { useMeQuery } from '../../generated/graphql';

import UserInfo from './UserInfo';

function UserInfoContainer() {
  const [token, setToken] = useAuth();
  const { data, loading } = useMeQuery({
    skip: !token,
    onError: error => {
      if (error.message === 'Unauthenticated') {
        setToken(undefined);
      }
    },
  });

  return (
    <UserInfo
      isUserAdmin={!!data?.me.isAdmin}
      isUserLoading={loading}
      userName={data?.me.displayName}
    />
  );
}

export default UserInfoContainer;

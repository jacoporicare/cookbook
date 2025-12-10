'use client';

import { useAuth } from '../../app/AuthProvider';
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

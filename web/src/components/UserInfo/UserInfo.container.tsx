'use client';

import { useAuth } from '@/lib/use-auth';

import { useUser } from '../../app/UserProvider';
import UserInfo from './UserInfo';

function UserInfoContainer() {
  const [token] = useAuth();
  const user = useUser();
  const isLoggedIn = !!token;

  return (
    <UserInfo
      isUserAdmin={user?.isAdmin}
      isUserLoading={false}
      userName={isLoggedIn ? user?.name : undefined}
    />
  );
}

export default UserInfoContainer;

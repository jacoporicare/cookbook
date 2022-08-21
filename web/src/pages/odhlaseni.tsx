import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../AuthContext';
import { withAuth } from '../auth';

function LogoutPage() {
  const router = useRouter();
  const [, setToken] = useAuth();

  useEffect(() => {
    setToken(undefined);
    router.push(router.query.u?.toString() || '/');
  }, [router, setToken]);

  return null;
}

export default withAuth()(LogoutPage);

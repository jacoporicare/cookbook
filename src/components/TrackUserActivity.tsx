import { useEffect } from 'react';

import { useAuth } from '../AuthContext';
import { useUpdateUserLastActivityMutation } from '../generated/graphql';

function TrackUserActivity() {
  const [token] = useAuth();
  const [updateUserLastActivity] = useUpdateUserLastActivityMutation();

  useEffect(() => {
    let int: number | undefined = undefined;

    if (token) {
      updateUserLastActivity();
      int = token ? window.setInterval(updateUserLastActivity, 60 * 1000) : undefined;
    }

    return () => {
      int && window.clearInterval(int);
    };
  }, [updateUserLastActivity, token]);

  return null;
}

export default TrackUserActivity;

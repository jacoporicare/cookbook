'use client';

import { useEffect } from 'react';

import { useAuth } from '../app/AuthProvider';
import { useUpdateUserLastActivityMutation } from '../generated/graphql';

function TrackUserActivity() {
  const [token] = useAuth();
  const [updateUserLastActivity] = useUpdateUserLastActivityMutation();

  useEffect(() => {
    let int: number | undefined = undefined;

    if (token) {
      updateUserLastActivity();
      int = window.setInterval(updateUserLastActivity, 60 * 1000);
    }

    return () => {
      if (int) {
        window.clearInterval(int);
      }
    };
  }, [updateUserLastActivity, token]);

  return null;
}

export default TrackUserActivity;

'use client';

import { useEffect } from 'react';

import { useAuth } from '@/app/AuthProvider';
import { trackUserActivityAction } from '@/app/actions/user';

function TrackUserActivity() {
  const [token] = useAuth();

  useEffect(() => {
    if (!token) {
      return;
    }

    trackUserActivityAction();
    const interval = window.setInterval(trackUserActivityAction, 60 * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [token]);

  return null;
}

export default TrackUserActivity;

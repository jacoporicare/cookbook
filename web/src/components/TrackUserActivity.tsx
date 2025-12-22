'use client';

import { useEffect } from 'react';

import { trackUserActivityAction } from '@/app/actions/user';
import { useAuth } from '@/lib/use-auth';

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

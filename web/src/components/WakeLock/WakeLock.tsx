'use client';

import { Monitor } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function WakeLock() {
  const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | undefined>(undefined);

  const wakeLockSupported =
    typeof navigator !== 'undefined' && 'wakeLock' in navigator;

  useEffect(() => {
    if (wakeLockEnabled) {
      navigator.wakeLock.request('screen').then((newWakeLock) => {
        wakeLock.current = newWakeLock;
        wakeLock.current.addEventListener('release', () =>
          setWakeLockEnabled(false),
        );
      });
    }

    return () => {
      wakeLock.current?.release();
      wakeLock.current = undefined;
    };
  }, [wakeLockEnabled]);

  if (!wakeLockSupported) {
    return null;
  }

  return (
    <div
      className={cn(
        'cursor-pointer text-center text-[0.8em]',
        wakeLockEnabled ? 'text-white' : 'text-gray-400',
      )}
      onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
    >
      <Monitor className="mx-auto my-1.5 size-4" />
      <div>Nevypínat</div>
    </div>
  );
}

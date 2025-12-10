import { DesktopWindows } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { colors } from '../../styles/colors';

function WakeLock() {
  const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | undefined>(undefined);

  const wakeLockSupported = 'wakeLock' in navigator;

  useEffect(() => {
    if (wakeLockEnabled) {
      navigator.wakeLock.request('screen').then(newWakeLock => {
        wakeLock.current = newWakeLock;
        wakeLock.current.addEventListener('release', () => setWakeLockEnabled(false));
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
    <Box
      sx={{
        cursor: 'pointer',
        textAlign: 'center',
        fontSize: '0.8em',
        color: colors.gray600,
        marginRight: '1rem',
        ...(wakeLockEnabled && { color: colors.white }),
      }}
      onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
    >
      <DesktopWindows fontSize="small" />
      <div>Nevypínat</div>
    </Box>
  );
}

export default WakeLock;

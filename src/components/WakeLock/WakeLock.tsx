import { DesktopWindows } from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { colors } from '../../styles/colors';

const useStyles = makeStyles({
  wakeLock: {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '0.8em',
    color: colors.gray600,
    marginRight: '1rem',
  },
  active: {
    color: colors.white,
  },
});

function WakeLock() {
  const classes = useStyles();

  const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
  const wakeLock = useRef<WakeLock>();

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
    <div
      className={classNames(classes.wakeLock, { [classes.active]: wakeLockEnabled })}
      onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
    >
      <DesktopWindows fontSize="small" />
      <div>Nevypínat</div>
    </div>
  );
}

export default WakeLock;

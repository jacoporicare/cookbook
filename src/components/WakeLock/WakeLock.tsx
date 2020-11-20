import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { colors } from '../../styles/colors';
import Icon from '../common/Icon';

function WakeLock() {
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
    <>
      <div
        className={classNames('wake-lock', { active: wakeLockEnabled })}
        onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
      >
        <Icon icon="desktop" />
        <div>Nevypínat</div>
      </div>
      <style jsx>{`
        .wake-lock {
          cursor: pointer;
          text-align: center;
          font-size: 0.8em;
          color: ${colors.gray600};
          margin-right: 1rem;
        }

        .wake-lock.active {
          color: ${colors.white};
        }
      `}</style>
    </>
  );
}

export default WakeLock;

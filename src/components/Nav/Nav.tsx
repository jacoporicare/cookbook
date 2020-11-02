import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { colors } from '../../styles/colors';
import UserInfo from '../UserInfo';
import Icon from '../common/Icon';

import Burger from './Burger';
import NavLink from './NavLink';

type Props = {
  showUserInfo?: boolean;
};

function Nav(props: Props) {
  const [wakeLockEnabled, setWakeLockEnabled] = useState(false);
  const wakeLock = useRef<WakeLock>();

  const wakeLockSupported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;

  useEffect(() => {
    if (wakeLockEnabled) {
      wakeLock.current?.release();
      navigator.wakeLock.request('screen').then(newWakeLock => {
        wakeLock.current = newWakeLock;
      });
    } else {
      wakeLock.current?.release();
      wakeLock.current = undefined;
    }
  }, [wakeLockEnabled]);

  return (
    <>
      <Burger />
      <nav>
        {wakeLockSupported && (
          <div
            className={classNames('wake-lock', { active: wakeLockEnabled })}
            onClick={() => setWakeLockEnabled(!wakeLockEnabled)}
          >
            <Icon icon="desktop" />
            <div>Nevypínat</div>
          </div>
        )}
        <NavLink href="/">Recepty</NavLink>
        <NavLink href="/prilohy">Přílohy</NavLink>
        {props.showUserInfo && <UserInfo />}
      </nav>
      <style jsx>{`
        .wake-lock {
          cursor: pointer;
          text-align: center;
          font-size: 0.8em;
          color: ${colors.gray600};
        }

        .wake-lock.active {
          color: ${colors.white};
        }

        @media (max-width: 1023px) {
          nav {
            position: fixed;
            top: 58px;
            right: 0;
            width: 250px;
            height: 100%;
            transform: translateX(250px);
            transition: transform 250ms ease-in-out;
            background: ${colors.gray1000};
          }

          .wake-lock {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }
        }

        @media (min-width: 1024px) {
          nav {
            display: flex;
            align-items: center;
          }

          .wake-lock {
            margin-right: 2rem;
          }
        }
      `}</style>
    </>
  );
}

export default Nav;

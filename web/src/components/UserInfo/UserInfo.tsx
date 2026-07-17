'use client';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { User } from '@/types/user';

import { NavLink } from '../Nav/NavLink';

type Props = {
  // `undefined` = not yet known (server / pre-hydration), `null` = guest.
  user?: User;
};

export function UserInfo({ user }: Props) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`
          px-0 py-1 text-xl font-light whitespace-nowrap text-gray-400
          max-lg:h-0 max-lg:overflow-hidden max-lg:border-t
          max-lg:border-gray-600
        `}
      >
        ·
      </div>
      {/*
        Reserve a stable width on desktop so the auth links filling in after
        hydration don't shift the search box. `undefined` is the unknown state:
        render nothing (never the guest login button) to avoid a wrong flash.
      */}
      <div className="lg:flex lg:min-w-36 lg:items-center">
        {user === undefined ? null : !user ? (
          <NavLink
            active={pathname === '/prihlaseni'}
            href={
              !pathname || pathname === '/prihlaseni'
                ? '/prihlaseni'
                : `/prihlaseni?u=${encodeURIComponent(pathname) || ''}`
            }
          >
            Přihlásit
          </NavLink>
        ) : (
          <>
            <NavLink href="/nastaveni">{user.name}</NavLink>
            <NavLink
              href={`/odhlaseni?u=${encodeURIComponent(pathname) || ''}`}
            >
              <LogOut className="inline size-5" />{' '}
              <span className="lg:hidden">Odhlásit</span>
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

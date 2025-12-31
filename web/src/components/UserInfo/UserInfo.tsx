'use client';

import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavLink } from '../Nav/NavLink';

type Props = {
  userName?: string;
  isUserAdmin?: boolean;
};

export function UserInfo(props: Props) {
  const pathname = usePathname();
  const isLoggedIn = !!props.userName;

  return (
    <>
      {props.isUserAdmin && <NavLink href="/admin">Admin</NavLink>}
      <div
        className={`
          px-0 py-1 text-xl font-light whitespace-nowrap text-gray-400
          max-lg:h-0 max-lg:overflow-hidden max-lg:border-t
          max-lg:border-gray-600
        `}
      >
        ·
      </div>
      {!isLoggedIn ? (
        <NavLink
          active={pathname === '/prihlaseni'}
          href={
            !pathname || pathname.startsWith('/prihlaseni')
              ? '/prihlaseni'
              : `/prihlaseni?u=${pathname || ''}`
          }
        >
          Přihlásit
        </NavLink>
      ) : (
        <>
          <NavLink href="/nastaveni">{props.userName}</NavLink>
          <NavLink href={`/odhlaseni?u=${pathname || ''}`}>
            <LogOut className="inline size-5" />{' '}
            <span className="lg:hidden">Odhlásit</span>
          </NavLink>
        </>
      )}
    </>
  );
}

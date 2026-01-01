'use client';

import { usePathname } from 'next/navigation';

import { User } from '@/types/user';

import { ThemeToggle } from '../ThemeToggle';
import { UserInfo } from '../UserInfo/UserInfo';
import { NavLink } from './NavLink';

type Props = {
  user?: User;
};

export function Nav(props: Props) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <input className="peer hidden" id="openSidebarMenu" type="checkbox" />
      <label
        className={`
          mt-2 ml-2 block size-5.5 shrink-0 cursor-pointer transition-all
          lg:hidden
        `}
        htmlFor="openSidebarMenu"
      >
        <div
          className={`
            h-0.75 w-full bg-white transition-all
            peer-checked:mt-1.75 peer-checked:rotate-135
          `}
        />
        <div
          className={`
            mt-0.75 h-0.75 w-full bg-white transition-all
            peer-checked:opacity-0
          `}
        />
        <div
          className={`
            mt-0.75 h-0.75 w-full bg-white transition-all
            peer-checked:-mt-2.25 peer-checked:rotate-[-135deg]
          `}
        />
      </label>
      <div
        className={`
          peer-checked:translate-x-0
          peer-checked:shadow-[-16px_0_32px_rgba(0,0,0,0.25)]
          max-lg:fixed max-lg:top-14.25 max-lg:right-0 max-lg:bottom-0
          max-lg:flex max-lg:w-62.5 max-lg:translate-x-62.5 max-lg:flex-col
          max-lg:justify-between max-lg:bg-gray-900 max-lg:transition-transform
          max-lg:duration-250 max-lg:ease-in-out
        `}
      >
        <nav className="lg:flex lg:items-center">
          <NavLink active={pathname === '/'} href="/">
            Recepty
          </NavLink>
          <NavLink active={pathname === '/prilohy'} href="/prilohy">
            Přílohy
          </NavLink>
          {props.user !== undefined && (
            <UserInfo
              isUserAdmin={props.user?.isAdmin}
              userName={props.user?.name}
            />
          )}
        </nav>
        <ThemeToggle className="sm:hidden" />
      </div>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { RecipeBaseFragment } from '@/generated/graphql';
import { User } from '@/types/user';

import { Nav } from '../Nav/Nav';
import { RecipeSearchContainer as RecipeSearch } from '../RecipeSearch/RecipeSearch.container';
import { ThemeToggle } from '../ThemeToggle';

const WakeLock = dynamic(
  () => import('../WakeLock/WakeLock').then((mod) => mod.WakeLock),
  { ssr: false },
);

type Props = {
  recipes?: RecipeBaseFragment[];
  user?: User;
};

export function Header(props: Props) {
  return (
    <header
      className={`
        fixed top-0 right-0 left-0 z-20 bg-gray-900 text-white shadow-md
      `}
    >
      <div
        className={`
          flex justify-between gap-4 px-4 py-2
          lg:px-8
          xl:px-12
          2xl:px-16
        `}
      >
        <div className="flex items-center">
          <Link
            href="/"
            className={`
              flex items-center gap-3 font-display text-4xl text-white
              no-underline
            `}
          >
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <span
              className={`
                hidden
                sm:inline
              `}
            >
              Žrádelník
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {props.recipes && <RecipeSearch recipes={props.recipes} />}
          <ThemeToggle className="max-sm:hidden" />
          <WakeLock />
          <Nav user={props.user} />
        </div>
      </div>
    </header>
  );
}

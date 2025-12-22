'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import Nav from '../Nav';
import RecipeSearch from '../RecipeSearch';

const WakeLock = dynamic(() => import('../WakeLock'), { ssr: false });

type Props = {
  showRecipeSearch?: boolean;
  showUserInfo?: boolean;
};

function Header(props: Props) {
  return (
    <header className={`
      fixed top-0 right-0 left-0 z-10 bg-gray-900 text-white shadow-md
    `}>
      <div className={`
        flex justify-between px-6 py-2
        sm:px-8
      `}>
        <div className="flex items-center">
          <Link
            href="/"
            className={`
              flex items-center font-display text-4xl text-white no-underline
            `}
          >
            <Image alt="Ikona" height={40} src="/assets/piggy.png" width={33} />
            <span className={`
              ml-3 hidden
              sm:inline
            `}>Žrádelník</span>
          </Link>
        </div>
        <div className="flex items-center">
          {props.showRecipeSearch && (
            <div className="mx-2">
              <RecipeSearch />
            </div>
          )}
          <WakeLock />
          <Nav showUserInfo={props.showUserInfo} />
        </div>
      </div>
    </header>
  );
}

export default Header;

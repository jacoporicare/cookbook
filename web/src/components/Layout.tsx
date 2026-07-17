import { ReactNode } from 'react';

import { getCachedRecipeList } from '@/lib/recipes-cache';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { NavClient } from './Nav/NavClient';
import { TrackUserActivity } from './TrackUserActivity';

type Props = {
  children: NonNullable<ReactNode>;
};

export async function Layout({ children }: Props) {
  // Cached, user-agnostic recipe list powers the header search. The
  // user-specific nav resolves the signed-in state on the client (<NavClient />
  // reads the JWT cookie), so this shell stays fully static/prerenderable — no
  // dynamic hole, no guest-then-signed-in flash.
  const { recipes } = await getCachedRecipeList();

  return (
    <>
      <Header recipes={recipes} nav={<NavClient />} />
      <TrackUserActivity />
      <div
        className={`
          px-4
          lg:px-8
          xl:px-12
          2xl:px-16
        `}
      >
        <main
          className={`
            mt-15.5 py-6
            sm:py-8
          `}
        >
          {children}
        </main>
        <footer
          className={`
            border-t border-gray-200 py-4
            sm:py-6
          `}
        >
          <Footer />
        </footer>
      </div>
    </>
  );
}

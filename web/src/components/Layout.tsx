'use client';

import { ReactNode } from 'react';

import { RecipeBaseFragment } from '@/generated/graphql';
import { User } from '@/types/user';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { TrackUserActivity } from './TrackUserActivity';

type Props = {
  children: NonNullable<ReactNode>;
  recipes?: RecipeBaseFragment[];
  user?: User;
};

export function Layout(props: Props) {
  return (
    <>
      <Header recipes={props.recipes} user={props.user} />
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
          {props.children}
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

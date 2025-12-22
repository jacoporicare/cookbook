'use client';

import { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import TrackUserActivity from './TrackUserActivity';

type Props = {
  children: NonNullable<ReactNode>;
  static?: boolean;
};

function Layout(props: Props) {
  return (
    <>
      {props.static ? (
        <Header />
      ) : (
        <>
          <Header showRecipeSearch showUserInfo />
          <TrackUserActivity />
        </>
      )}
      <div className="mx-auto max-w-7xl px-4">
        <main className={`
          mt-15.5 py-6
          sm:py-8
        `}>{props.children}</main>
        <footer className={`
          border-t border-gray-200 py-4
          sm:py-6
        `}>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Layout;

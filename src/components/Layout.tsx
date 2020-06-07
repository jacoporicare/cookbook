import React from 'react';
import Notifications from 'react-notify-toast';

import { colors } from '../styles/colors';

import Footer from './Footer/Footer';
import Header from './Header';
import TrackUserActivity from './TrackUserActivity';
import DocumentTitle from './common/DocumentTitle';
import { BoxFooter, BoxMain } from './core';

type Props = {
  children: React.ReactNode;
  static?: boolean;
};

function Layout(props: Props) {
  return (
    <>
      <DocumentTitle />
      <Notifications options={{ zIndex: 1100 }} />
      {props.static ? (
        <Header />
      ) : (
        <>
          <Header showRecipeSearch showUserInfo />
          <TrackUserActivity />
        </>
      )}
      <BoxMain mt="62px" p={[3, 4]}>
        {props.children}
      </BoxMain>
      <BoxFooter borderTop={`1px solid ${colors.gray200}`} p={[3, 4]}>
        <Footer />
      </BoxFooter>
    </>
  );
}

export default Layout;

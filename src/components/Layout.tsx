import { Container, Box } from '@mui/material';
import React from 'react';

import { colors } from '../styles/colors';

import Footer from './Footer';
import Header from './Header';
import TrackUserActivity from './TrackUserActivity';
import DocumentTitle from './common/DocumentTitle';

type Props = {
  children: NonNullable<React.ReactNode>;
  static?: boolean;
};

function Layout(props: Props) {
  return (
    <>
      <DocumentTitle />
      {props.static ? (
        <Header />
      ) : (
        <>
          <Header showRecipeSearch showUserInfo />
          <TrackUserActivity />
        </>
      )}
      <Container maxWidth={false}>
        <Box component="main" mt="62px" py={[3, 4]}>
          {props.children}
        </Box>
        <Box borderTop={`1px solid ${colors.gray200}`} component="footer" py={[2, 3]}>
          <Footer />
        </Box>
      </Container>
    </>
  );
}

export default Layout;

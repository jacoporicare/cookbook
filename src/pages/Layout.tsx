import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import Notifications from 'react-notify-toast';

import DocumentTitle from '../components/common/DocumentTitle';
import { Box } from '../components/core';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { colors } from '../styles/colors';
import { User } from '../types';

type Props = {
  children: React.ReactNode;
} & RouteComponentProps;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      name
    }
  }
`;

export type MeQueryData = {
  me?: User;
};

function Layout(props: Props) {
  const { data, loading } = useQuery<MeQueryData>(ME_QUERY);

  function handleRecipeSelected(slug: string) {
    props.navigate && props.navigate(`/recept/${slug}`);
  }

  return (
    <>
      <DocumentTitle />
      <Notifications options={{ zIndex: 1100 }} />
      <Header
        userName={data && data.me && data.me.name}
        isUserLoading={loading}
        onRecipeSelected={handleRecipeSelected}
      />
      <Box p={[3, 4]}>
        {props.children}
        <Box mt={[3, 4]} pt={2} borderTop={`1px solid ${colors.gray200}`}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default Layout;

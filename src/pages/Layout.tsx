import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Notifications from 'react-notify-toast';

import { User } from '../types';
import DocumentTitle from '../components/common/DocumentTitle';
import { BoxFooter, BoxMain } from '../components/core';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { colors } from '../styles/colors';

type Props = {
  children: React.ReactNode;
} & RouteComponentProps;

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      displayName
      isAdmin
    }
  }
`;

export type MeQueryData = {
  me?: User;
};

export const UPDATE_USER_LAST_ACTIVITY_MUTATION = gql`
  mutation UpdateUserLastActivity {
    updateUserLastActivity
  }
`;

function Layout(props: Props) {
  const { data, loading } = useQuery<MeQueryData>(ME_QUERY);
  const [updateUserLastActivity] = useMutation<boolean>(UPDATE_USER_LAST_ACTIVITY_MUTATION);

  useEffect(() => {
    updateUserLastActivity();
    const int = window.setInterval(updateUserLastActivity, 60 * 1000);

    return () => clearInterval(int);
  }, []);

  function handleRecipeSelected(slug: string) {
    props.navigate && props.navigate(`/recept/${slug}`);
  }

  return (
    <>
      <DocumentTitle />
      <Notifications options={{ zIndex: 1100 }} />
      <Header
        userName={data && data.me && data.me.displayName}
        isUserLoading={loading}
        isUserAdmin={data && data.me && data.me.isAdmin}
        onRecipeSelected={handleRecipeSelected}
      />
      <BoxMain p={[3, 4]} mt={['70px', '86px']}>
        {props.children}
      </BoxMain>
      <BoxFooter p={[3, 4]} borderTop={`1px solid ${colors.gray200}`}>
        <Footer />
      </BoxFooter>
    </>
  );
}

export default Layout;

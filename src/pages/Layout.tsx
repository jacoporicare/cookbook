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
  }, [updateUserLastActivity]);

  function handleRecipeSelected(slug: string) {
    props.navigate && props.navigate(`/recept/${slug}`);
  }

  return (
    <>
      <DocumentTitle />
      <Notifications options={{ zIndex: 1100 }} />
      <Header
        isUserAdmin={data && data.me && data.me.isAdmin}
        isUserLoading={loading}
        pathname={props.location && props.location.pathname}
        userName={data && data.me && data.me.displayName}
        onRecipeSelected={handleRecipeSelected}
      />
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

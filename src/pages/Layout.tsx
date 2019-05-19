import { RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AuthAction, fetchUser } from '../components/Auth/actions';
import DocumentTitle from '../components/common/DocumentTitle';
import { Box } from '../components/core';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { colors } from '../styles/colors';
import { StoreState, User } from '../types';
import { isOnline } from '../utils';
import { isAuthenticated } from '../clientAuth';

type Props = {
  children: React.ReactNode;
  user: User | undefined;
  isFetchingUser: boolean;
  fetchUserError: boolean;
  fetchUser: () => Promise<AuthAction>;
} & RouteComponentProps;

function Layout(props: Props) {
  useEffect(() => {
    if (
      isOnline() &&
      isAuthenticated() &&
      !props.user &&
      !props.isFetchingUser &&
      !props.fetchUserError
    ) {
      props.fetchUser();
    }
  }, [isOnline(), isAuthenticated(), props.user, props.isFetchingUser, props.fetchUserError]);

  function handleRecipeSelected(slug: string) {
    props.navigate && props.navigate(`/recept/${slug}`);
  }

  return (
    <>
      <DocumentTitle />
      <Notifications options={{ zIndex: 1100 }} />
      <Header
        userName={props.user ? props.user.name : undefined}
        isFetchingUser={props.isFetchingUser}
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

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.user,
  isFetchingUser: state.auth.isFetchingUser,
  fetchUserError: state.auth.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, {}, AnyAction>) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);

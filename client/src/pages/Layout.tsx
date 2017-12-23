import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Notifications from 'react-notify-toast';

import { User, StoreState } from '../types';
import { fetchUser, NavbarAction } from '../components/Navbar/actions';
import Navbar from '../components/Navbar/Navbar';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

interface Props extends RouteComponentProps<{}, {}> {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | undefined;
  isFetchingUser: boolean;
  fetchUserError: boolean;
  fetchUser: () => Promise<NavbarAction>;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    const { isAuthenticated, user, fetchUser } = this.props;

    if (isAuthenticated && !user) {
      fetchUser();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { fetchUser } = this.props;
    const { isAuthenticated, user, isFetchingUser, fetchUserError } = nextProps;

    if (isAuthenticated && !user && !isFetchingUser && !fetchUserError) {
      fetchUser();
    }
  }

  render() {
    const { isAuthenticated, user, isFetchingUser, router, children } = this.props;

    return (
      <div>
        <Notifications />
        <Header
          isAuthenticated={isAuthenticated}
          userName={user ? user.name : undefined}
          isFetchingUser={isFetchingUser}
        />
        {isAuthenticated && <Navbar router={router} />}
        {children}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.navbar.user,
  isFetchingUser: state.navbar.isFetchingUser,
  fetchUserError: state.navbar.error,
});

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

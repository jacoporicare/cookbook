import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

import PageHeading from '../components/common/PageHeading';
import DocumentTitle from '../components/common/DocumentTitle';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { useAuth } from '../AuthContext';

type Props = RouteComponentProps;

function SettingsPage(_props: Props) {
  const [token] = useAuth();

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <DocumentTitle title="Nastavení" />
      <PageHeading>Nastavení</PageHeading>
      <ChangePassword />
    </>
  );
}

export default SettingsPage;

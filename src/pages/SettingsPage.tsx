import { RouteComponentProps, Redirect } from '@reach/router';
import React from 'react';

import { useAuth } from '../AuthContext';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import DocumentTitle from '../components/common/DocumentTitle';
import PageHeading from '../components/common/PageHeading';

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

import { Alert } from '@material-ui/lab';
import React from 'react';

import Layout from '../components/Layout';
import PageHeading from '../components/common/PageHeading';

function NotFoundPage() {
  return (
    <Layout static>
      <PageHeading>Nenalezeno</PageHeading>
      <Alert elevation={1} severity="warning">
        Toto není stránka, kterou hledáš.
      </Alert>
    </Layout>
  );
}

export default NotFoundPage;

import { Alert } from '@mui/material';

import Layout from '@/components/Layout';
import PageHeading from '@/components/common/PageHeading';

export default function NotFound() {
  return (
    <Layout static>
      <PageHeading>Nenalezeno</PageHeading>
      <Alert elevation={1} severity="warning">
        Toto není stránka, kterou hledáš.
      </Alert>
    </Layout>
  );
}

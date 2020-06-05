import flow from 'lodash.flow';
import { useRouter } from 'next/router';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import ChangePassword from '../components/ChangePassword';
import Layout from '../components/Layout';
import DocumentTitle from '../components/common/DocumentTitle';
import PageHeading from '../components/common/PageHeading';

function SettingsPage() {
  const [token] = useAuth();
  const router = useRouter();

  if (!token && typeof window !== 'undefined') {
    router.push('/');
  }

  if (!token) {
    return null;
  }

  return (
    <Layout>
      <DocumentTitle title="Nastavení" />
      <PageHeading>Nastavení</PageHeading>
      <ChangePassword />
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(SettingsPage);

import flow from 'lodash.flow';
import { useRouter } from 'next/router';

import { useAuth } from '../AuthContext';
import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import ChangePassword from '../components/ChangePassword';
import Layout from '../components/Layout';
import DocumentTitle from '../components/common/DocumentTitle';

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
      <ChangePassword />
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(SettingsPage);

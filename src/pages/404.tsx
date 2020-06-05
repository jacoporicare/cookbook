import Layout from '../components/Layout';
import PageHeading from '../components/common/PageHeading';
import { WarningAlert } from '../components/elements';

function NotFoundPage() {
  return (
    <Layout static>
      <PageHeading>Nenalezeno</PageHeading>
      <WarningAlert>Toto není stránka, kterou hledáš.</WarningAlert>
    </Layout>
  );
}

export default NotFoundPage;

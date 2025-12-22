import Layout from '@/components/Layout';
import PageHeading from '@/components/common/PageHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NotFound() {
  return (
    <Layout static>
      <PageHeading>Nenalezeno</PageHeading>
      <Alert>
        <AlertDescription>Toto není stránka, kterou hledáš.</AlertDescription>
      </Alert>
    </Layout>
  );
}

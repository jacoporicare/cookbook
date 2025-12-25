import { Layout } from '@/components/Layout';
import { PageHeading } from '@/components/common/PageHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser, getLayoutData } from '@/lib/auth-server';

export default async function NotFound() {
  const client = await getClient();
  const currentUser = await getCurrentUser(client);
  const { recipes, user } = await getLayoutData({ client, currentUser });

  return (
    <Layout recipes={recipes} user={user}>
      <PageHeading>Nenalezeno</PageHeading>
      <Alert>
        <AlertDescription>Toto není stránka, kterou hledáš.</AlertDescription>
      </Alert>
    </Layout>
  );
}

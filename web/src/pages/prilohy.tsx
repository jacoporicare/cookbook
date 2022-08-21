import flow from 'lodash.flow';

import { withApollo } from '../apollo';
import { withAuth } from '../auth';
import Layout from '../components/Layout';
import SideDishList from '../components/SideDishList/SideDishList';
import DocumentTitle from '../components/common/DocumentTitle';
import { SideDish } from '../types';

const sideDishes: SideDish[] = [
  { title: 'Brambory', sideWeight: '180 g' },
  { title: 'Těstoviny', sideWeight: '70 g', mainWeight: '85 g', multiplicator: 2.4 },
  { title: 'Rýže', sideWeight: '70 g', mainWeight: '75 g', multiplicator: 3.1 },
  { title: 'Čočka', sideWeight: '60 g', mainWeight: '75 g' },
  { title: 'Fazole', multiplicator: 2.35 },
  { title: 'Kuskus', sideWeight: '45 g', mainWeight: '50 g' },
  { title: 'Polenta', sideWeight: '45 g' },
];

function SideDishListPage() {
  return (
    <Layout>
      <DocumentTitle title="Přílohy" />
      <SideDishList sideDishes={sideDishes} />
    </Layout>
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(SideDishListPage);

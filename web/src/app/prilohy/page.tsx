import type { Metadata } from 'next';

import Layout from '@/components/Layout';
import SideDishList from '@/components/SideDishList/SideDishList';
import { SideDish } from '@/types';

export const metadata: Metadata = {
  title: 'Přílohy',
};

const sideDishes: SideDish[] = [
  { title: 'Brambory', sideWeight: '180 g' },
  {
    title: 'Těstoviny',
    sideWeight: '70 g',
    mainWeight: '85 g',
    multiplicator: 2.4,
  },
  { title: 'Rýže', sideWeight: '70 g', mainWeight: '75 g', multiplicator: 3.1 },
  { title: 'Čočka', sideWeight: '60 g', mainWeight: '75 g' },
  { title: 'Fazole', multiplicator: 2.35 },
  { title: 'Kuskus', sideWeight: '45 g', mainWeight: '50 g' },
  { title: 'Polenta', sideWeight: '45 g' },
];

export default function Page() {
  return (
    <Layout>
      <SideDishList sideDishes={sideDishes} />
    </Layout>
  );
}

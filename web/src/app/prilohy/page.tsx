import type { Metadata } from 'next';

import SideDishListPage from './SideDishListPage';

export const metadata: Metadata = {
  title: 'Přílohy',
};

export default function Page() {
  return <SideDishListPage />;
}

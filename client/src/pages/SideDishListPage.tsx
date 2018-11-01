import React from 'react';

import { SideDish } from '../types';
import DocumentTitle from '../components/common/DocumentTitle';
import SideDishList from '../components/SideDishList/SideDishList';

const sideDishes: SideDish[] = [
  { title: 'Brambory', sideWeight: '180 g' },
  { title: 'Těstoviny', sideWeight: '70g', mainWeight: '85g' },
  { title: 'Rýže', sideWeight: '60g', mainWeight: '75g' },
  { title: 'Čočka', sideWeight: '60g', mainWeight: '75g' },
  { title: 'Kuskus', sideWeight: '45g', mainWeight: '50g' },
  { title: 'Polenta', sideWeight: '45g' },
];

export default function SideDishListPage() {
  return (
    <>
      <DocumentTitle title="Přílohy" />
      <SideDishList sideDishes={sideDishes} />
    </>
  );
}

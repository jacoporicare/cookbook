import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { SideDish } from '../types';
import DocumentTitle from '../components/common/DocumentTitle';
import SideDishList from '../components/SideDishList/SideDishList';

const sideDishes: SideDish[] = [
  { title: 'Brambory', sideWeight: '180 g' },
  { title: 'Těstoviny', sideWeight: '70 g', mainWeight: '85 g', multiplicator: 2.4 },
  { title: 'Rýže', sideWeight: '70 g', mainWeight: '75 g', multiplicator: 3.1 },
  { title: 'Čočka', sideWeight: '60 g', mainWeight: '75 g' },
  { title: 'Fazole', multiplicator: 2.35 },
  { title: 'Kuskus', sideWeight: '45 g', mainWeight: '50 g' },
  { title: 'Polenta', sideWeight: '45 g' },
];

type Props = RouteComponentProps;

function SideDishListPage(_props: Props) {
  return (
    <>
      <DocumentTitle title="Přílohy" />
      <SideDishList sideDishes={sideDishes} />
    </>
  );
}

export default SideDishListPage;

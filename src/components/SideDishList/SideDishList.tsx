import React from 'react';

import { SideDish } from '../../types';
import { Table, TableHeadRow, TableHeadCell } from '../elements';
import PageHeading from '../common/PageHeading';

import SideDishListItem from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

function SideDishList({ sideDishes }: Props) {
  return (
    <>
      <PageHeading>Přílohy</PageHeading>

      <Table>
        <thead>
          <TableHeadRow>
            <TableHeadCell>Název</TableHeadCell>
            <TableHeadCell>Příloha</TableHeadCell>
            <TableHeadCell>Hlavní</TableHeadCell>
            <TableHeadCell>Po uvaření</TableHeadCell>
          </TableHeadRow>
        </thead>

        <tbody>
          {sideDishes.map(sideDish => (
            <SideDishListItem key={sideDish.title} {...sideDish} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default SideDishList;

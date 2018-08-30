import React from 'react';

import { SideDish } from '../../types';
import { Table, TableHeadRow, TableHeadCell } from '../elements/Table';
import { PageHeading } from '../common/PageHeading';
import { SideDishListItem } from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

export const SideDishList = ({ sideDishes }: Props) => (
  <>
    <PageHeading>Přílohy</PageHeading>

    <Table>
      <thead>
        <TableHeadRow>
          <TableHeadCell>Název</TableHeadCell>
          <TableHeadCell>Příloha</TableHeadCell>
          <TableHeadCell>Hlavní</TableHeadCell>
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

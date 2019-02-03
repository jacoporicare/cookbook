import React from 'react';

import { SideDish } from '../../types';
import { TableRow, TableCell } from '../elements';

type Props = SideDish;

function SideDishListItem({ title, sideWeight, mainWeight }: Props) {
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell textAlign="right">{sideWeight}</TableCell>
      <TableCell textAlign="right">{mainWeight}</TableCell>
    </TableRow>
  );
}

export default SideDishListItem;

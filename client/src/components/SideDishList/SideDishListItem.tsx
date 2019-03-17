import React from 'react';

import { SideDish } from '../../types';
import { TableRow, TableCell } from '../elements';

type Props = SideDish;

function SideDishListItem({ title, sideWeight, mainWeight, multiplicator }: Props) {
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell textAlign="right">{sideWeight}</TableCell>
      <TableCell textAlign="right">{mainWeight}</TableCell>
      <TableCell textAlign="right">
        {multiplicator &&
          `×${multiplicator.toLocaleString('cs', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
      </TableCell>
    </TableRow>
  );
}

export default SideDishListItem;

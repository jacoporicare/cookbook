import { TableRow, TableCell } from '@material-ui/core';
import React from 'react';

import { SideDish } from '../../types';

type Props = SideDish;

function SideDishListItem({ title, sideWeight, mainWeight, multiplicator }: Props) {
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell align="right">{sideWeight}</TableCell>
      <TableCell align="right">{mainWeight}</TableCell>
      <TableCell align="right">
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

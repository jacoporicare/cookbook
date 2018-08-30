import React from 'react';

import { SideDish } from '../../types';
import { TableRow, TableCell } from '../elements/Table';

type Props = SideDish;

export const SideDishListItem = ({ title, sideWeight, mainWeight }: Props) => (
  <TableRow>
    <TableCell>{title}</TableCell>
    <TableCell textAlign="right">{sideWeight}</TableCell>
    <TableCell textAlign="right">{mainWeight}</TableCell>
  </TableRow>
);

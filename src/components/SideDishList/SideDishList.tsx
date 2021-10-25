import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import { SideDish } from '../../types';
import PageHeading from '../common/PageHeading';

import SideDishListItem from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

function SideDishList({ sideDishes }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth="600px" width="100%">
        <PageHeading>Přílohy</PageHeading>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">Název</TableCell>
                <TableCell align="right" width="20%">
                  Příloha
                </TableCell>
                <TableCell align="right" width="20%">
                  Hlavní
                </TableCell>
                <TableCell align="right" width="20%">
                  Po uvaření
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sideDishes.map(sideDish => (
                <SideDishListItem key={sideDish.title} {...sideDish} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default SideDishList;

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

import { SideDish } from '../../types';
import PageHeading from '../common/PageHeading';

import SideDishListItem from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

function SideDishList({ sideDishes }: Props) {
  return (
    <Box maxWidth="600px" mx="auto">
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
  );
}

export default SideDishList;

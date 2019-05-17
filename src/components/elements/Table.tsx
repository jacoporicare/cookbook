import styled from 'react-emotion';

import { colors } from '../../styles/colors';
import { Box, BoxProps } from '../core';

export const Table = Box.withComponent('table');

export const TableRow = styled(Box)<BoxProps>`
  &:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }
`.withComponent('tr');

export const TableCell = Box.withComponent('td');
TableCell.defaultProps = {
  borderTop: `1px solid ${colors.gray300}`,
  p: 2,
};

export const TableHeadRow = Box.withComponent('tr');

export const TableHeadCell = TableCell.withComponent('th');
TableHeadCell.defaultProps = {
  borderBottom: `2px solid ${colors.gray300}`,
  p: 2,
};

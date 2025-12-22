import { TableCell, TableRow } from '@/components/ui/table';

import { SideDish } from '../../types';

type Props = SideDish;

function SideDishListItem({
  title,
  sideWeight,
  mainWeight,
  multiplicator,
}: Props) {
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell className="text-right">{sideWeight}</TableCell>
      <TableCell className="text-right">{mainWeight}</TableCell>
      <TableCell className="text-right">
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

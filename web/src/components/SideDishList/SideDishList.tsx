import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { SideDish } from '../../types';
import { PageHeading } from '../common/PageHeading';
import { SideDishListItem } from './SideDishListItem';

type Props = {
  sideDishes: SideDish[];
};

export function SideDishList({ sideDishes }: Props) {
  return (
    <div className="mx-auto max-w-150">
      <PageHeading>Přílohy</PageHeading>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Název</TableHead>
              <TableHead className="w-[20%] text-right">Příloha</TableHead>
              <TableHead className="w-[20%] text-right">Hlavní</TableHead>
              <TableHead className="w-[20%] text-right">Po uvaření</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sideDishes.map((sideDish) => (
              <SideDishListItem key={sideDish.title} {...sideDish} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

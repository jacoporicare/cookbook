'use client';

import { ChangeEvent, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { Ingredient } from '../../generated/graphql';

type Props = {
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
};

export function IngredientList(props: Props) {
  const [servingCount, setServingCount] = useState(props.servingCount);
  const [prevPropServingCount, setPrevPropServingCount] = useState(
    props.servingCount,
  );

  // Adjust state when prop changes (React-recommended pattern instead of useEffect)
  if (props.servingCount !== prevPropServingCount) {
    setPrevPropServingCount(props.servingCount);
    setServingCount(props.servingCount);
  }

  function getAmount(amount?: number) {
    if (!amount) {
      return '';
    }

    if (!servingCount || !props.servingCount) {
      return amount.toLocaleString('cs');
    }

    return ((amount / props.servingCount) * servingCount).toLocaleString('cs');
  }

  function handleServingCountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const parsedValue = Number(event.target.value);

    setServingCount(
      value !== '' && !Number.isNaN(parsedValue)
        ? Math.abs(parsedValue)
        : undefined,
    );
  }

  function handleServingCountBlur() {
    if (props.servingCount && !servingCount) {
      setServingCount(props.servingCount);
    }
  }

  const { ingredients, servingCount: initialServingCount } = props;

  return (
    <>
      <h3 className="mb-2 text-xl font-medium">Ingredience</h3>
      <Card>
        {(!ingredients || !ingredients.length) && (
          <Alert>
            <AlertDescription>Žádné ingredience.</AlertDescription>
          </Alert>
        )}

        {Boolean(initialServingCount) && (
          <div className="mt-2 flex items-center border-b px-4 py-2">
            <span className="mr-2 text-muted-foreground">Počet porcí</span>
            <Input
              type="number"
              min={1}
              value={!servingCount ? '' : servingCount}
              onBlur={handleServingCountBlur}
              onChange={handleServingCountChange}
              className="h-8 w-20"
            />
          </div>
        )}

        {ingredients && ingredients.length > 0 && (
          <Table>
            <TableBody>
              {ingredients.map((ingredient) => {
                const { id, isGroup, name, amount, amountUnit } = ingredient;

                return (
                  <TableRow key={id} className={cn(isGroup && 'bg-muted')}>
                    <TableCell className="w-[20%] text-right">
                      {!isGroup && getAmount(amount ?? undefined)}
                    </TableCell>
                    <TableCell className="w-[10%]">
                      {!isGroup && amountUnit}
                    </TableCell>
                    <TableCell>
                      <span className={isGroup ? 'font-medium' : ''}>
                        {name}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}

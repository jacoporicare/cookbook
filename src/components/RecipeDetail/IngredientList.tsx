import { Box, Typography } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import { InfoAlert, Input, InputAddon, Table, TableCell, TableRow } from '../elements';

type Props = {
  ingredients: Ingredient[] | null;
  servingCount: number | null;
};

type State = {
  servingCount: number | null;
};

function IngredientList(props: Props) {
  const [servingCount, setServingCount] = useState(props.servingCount);

  useEffect(() => {
    setServingCount(props.servingCount);
  }, [props.servingCount]);

  function getAmount(amount: number | null) {
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

    setServingCount(value !== '' && !Number.isNaN(parsedValue) ? Math.abs(parsedValue) : null);
  }

  function handleServingCountBlur() {
    if (props.servingCount && !servingCount) {
      setServingCount(props.servingCount);
    }
  }

  const { ingredients, servingCount: initialServingCount } = props;

  if (!ingredients || !ingredients.length) {
    return <InfoAlert>Žádné ingredience.</InfoAlert>;
  }

  return (
    <>
      {Boolean(initialServingCount) && (
        <Box display="flex" mb={2}>
          <InputAddon isPrepend>Počet porcí</InputAddon>
          <Input
            flex="auto"
            min={1}
            type="number"
            value={!servingCount ? '' : servingCount}
            hasPrependAddon
            onBlur={handleServingCountBlur}
            onChange={handleServingCountChange}
          />
        </Box>
      )}

      <Table cellSpacing={0} width={1}>
        <tbody>
          {ingredients.map(ingredient => {
            const { _id, isGroup, name, amount, amountUnit } = ingredient;

            return (
              <TableRow key={_id} css={isGroup && { backgroundColor: colors.gray200 }}>
                <TableCell textAlign="right" width="20%">
                  {!isGroup && getAmount(amount)}
                </TableCell>
                <TableCell width="10%">{!isGroup && amountUnit}</TableCell>
                <TableCell>
                  <Typography variant={isGroup ? 'subtitle1' : 'body1'}>{name}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default IngredientList;

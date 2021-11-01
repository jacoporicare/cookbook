import { Box, Divider } from '@mui/material';
import { useState } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient } from '../../generated/graphql';

import IngredientForm, { IngredientFields } from './IngredientForm';
import IngredientGroupForm, { IngredientGroupFields } from './IngredientGroupForm';
import IngredientList from './IngredientList';

export type AddIngredientEventHandler = (
  name: string,
  amount?: number,
  amountUnit?: string,
) => void;
export type AddGroupEventHandler = (group: string) => void;
export type RemoveEventHandler = (index: number) => void;

type Props = {
  items: Omit<Ingredient, '_id' | 'id'>[];
  ingredientOptions: string[];
  onAdd: AddIngredientEventHandler;
  onAddGroup: AddGroupEventHandler;
  onRemove: RemoveEventHandler;
  onSort: SortEndHandler;
};

function IngredientEdit({ items, ingredientOptions, onRemove, onSort, onAdd, onAddGroup }: Props) {
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [amountUnit, setAmountUnit] = useState<string>();
  const [group, setGroup] = useState<string>();

  function handleChange(name: IngredientFields | IngredientGroupFields, value: string) {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'amount': {
        const parsed = Number.parseFloat(value);
        setAmount(Number.isNaN(parsed) ? undefined : parsed);
        break;
      }

      case 'amountUnit':
        setAmountUnit(value);
        break;

      case 'group':
        setGroup(value);
        break;

      default:
        break;
    }
  }

  function handleAddIngredient() {
    if (!name) {
      return;
    }

    onAdd(name, amount, amountUnit);
    setName(undefined);
    setAmount(undefined);
    setAmountUnit(undefined);
  }

  function handleAddGroup() {
    if (!group) {
      return;
    }

    onAddGroup(group);
    setGroup(undefined);
  }

  return (
    <>
      <IngredientList items={items} onRemove={onRemove} onSort={onSort} />
      <Box mt={3}>
        <IngredientForm
          amount={amount}
          amountUnit={amountUnit}
          ingredientOptions={ingredientOptions}
          name={name}
          onAdd={handleAddIngredient}
          onChange={handleChange}
        />
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box mt={3}>
        <IngredientGroupForm group={group} onAdd={handleAddGroup} onChange={handleChange} />
      </Box>
    </>
  );
}

export default IngredientEdit;

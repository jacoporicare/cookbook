'use client';

import { useState } from 'react';

import { Separator } from '@/components/ui/separator';

import { Ingredient } from '../../generated/graphql';
import { IngredientFields, IngredientForm } from './IngredientForm';
import {
  IngredientGroupFields,
  IngredientGroupForm,
} from './IngredientGroupForm';
import { IngredientList } from './IngredientList';

export type AddIngredientEventHandler = (
  name: string,
  amount?: number,
  amountUnit?: string,
) => void;
export type AddGroupEventHandler = (group: string) => void;
export type RemoveEventHandler = (index: number) => void;
export type SortHandler = (args: {
  oldIndex: number;
  newIndex: number;
}) => void;

type Props = {
  items: Omit<Ingredient, '_id' | 'id'>[];
  ingredientOptions: string[];
  onAdd: AddIngredientEventHandler;
  onAddGroup: AddGroupEventHandler;
  onRemove: RemoveEventHandler;
  onSort: SortHandler;
};

export function IngredientEdit({
  items,
  ingredientOptions,
  onRemove,
  onSort,
  onAdd,
  onAddGroup,
}: Props) {
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [amountUnit, setAmountUnit] = useState<string>();
  const [group, setGroup] = useState<string>();

  function handleChange(
    fieldName: IngredientFields | IngredientGroupFields,
    value: string,
  ) {
    switch (fieldName) {
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
    <div className="space-y-6">
      <IngredientList items={items} onRemove={onRemove} onSort={onSort} />
      <IngredientForm
        amount={amount}
        amountUnit={amountUnit}
        ingredientOptions={ingredientOptions}
        name={name}
        onAdd={handleAddIngredient}
        onChange={handleChange}
      />
      <Separator />
      <IngredientGroupForm
        group={group}
        onAdd={handleAddGroup}
        onChange={handleChange}
      />
    </div>
  );
}

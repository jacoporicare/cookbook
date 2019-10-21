import React, { ChangeEvent, useState } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient, AutosuggestChangeEventHandler } from '../../types';
import { Box, Text } from '../core';

import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import IngredientGroupForm from './IngredientGroupForm';

export type AddIngredientEventHandler = (
  name: string,
  amount?: number,
  amountUnit?: string,
) => void;
export type AddGroupEventHandler = (group: string) => void;
export type RemoveEventHandler = (index: number) => void;

type Props = {
  items: Ingredient[];
  ingredientOptions: string[];
  onAdd: AddIngredientEventHandler;
  onAddGroup: AddGroupEventHandler;
  onRemove: RemoveEventHandler;
  onSort: SortEndHandler;
};

const Heading = Text.withComponent('h3');
Heading.defaultProps = {
  fontWeight: 300,
};

function IngredientEdit({ items, ingredientOptions, onRemove, onSort, onAdd, onAddGroup }: Props) {
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [amountUnit, setAmountUnit] = useState<string>();
  const [group, setGroup] = useState<string>();

  const handleIngredientChange: AutosuggestChangeEventHandler = (
    event,
    selectEvent,
    targetName,
  ) => {
    const name = targetName || event.currentTarget.name;
    const value = selectEvent ? selectEvent.newValue : event.currentTarget.value;

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

      default:
        break;
    }
  };

  function handleGroupChange(event: ChangeEvent<HTMLInputElement>) {
    setGroup(event.target.value);
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
      <Box mb={3}>
        <IngredientList items={items} onRemove={onRemove} onSort={onSort} />
      </Box>
      <Box mb={3}>
        <Heading>Přidat ingredienci</Heading>
        <IngredientForm
          amount={amount}
          amountUnit={amountUnit}
          ingredientOptions={ingredientOptions}
          name={name}
          onAdd={handleAddIngredient}
          onChange={handleIngredientChange}
        />
      </Box>
      <Box>
        <Heading>Přidat skupinu</Heading>
        <IngredientGroupForm group={group} onAdd={handleAddGroup} onChange={handleGroupChange} />
      </Box>
    </>
  );
}

export default IngredientEdit;

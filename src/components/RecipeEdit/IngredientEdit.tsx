import React, { ChangeEvent, useState } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient } from '../../generated/graphql';
import { AutosuggestChangeEventHandler } from '../../types';
import { Box, Text } from '../core';

import IngredientForm from './IngredientForm';
import IngredientGroupForm from './IngredientGroupForm';
import IngredientList from './IngredientList';

export type AddIngredientEventHandler = (
  name: string,
  amount: number | null,
  amountUnit: string | null,
) => void;
export type AddGroupEventHandler = (group: string) => void;
export type RemoveEventHandler = (index: number) => void;

type Props = {
  items: Omit<Ingredient, '_id'>[];
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
  const [name, setName] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [amountUnit, setAmountUnit] = useState<string | null>(null);
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
        setAmount(Number.isNaN(parsed) ? null : parsed);
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
    setName(null);
    setAmount(null);
    setAmountUnit(null);
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

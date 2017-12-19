import React, { ChangeEvent } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient, AutosuggestChangeEventHandler } from '../../types';
import { parseValue } from '../../utils';
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

interface Props {
  items: Ingredient[];
  ingredientOptions: string[];
  onAdd: AddIngredientEventHandler;
  onAddGroup: AddGroupEventHandler;
  onRemove: RemoveEventHandler;
  onSort: SortEndHandler;
}

interface State {
  name?: string;
  amount?: number;
  amountUnit?: string;
  group?: string;
}

class IngredientEdit extends React.Component<Props, State> {
  state: State = {};

  handleIngredientChange: AutosuggestChangeEventHandler = (event, selectEvent, targetName) => {
    const name = targetName || event.currentTarget.name;

    if (name !== 'name' && name !== 'amount' && name !== 'amountUnit') {
      return;
    }

    const value = selectEvent ? selectEvent.newValue : event.currentTarget.value;
    const { type } = event.currentTarget;

    this.setState({
      [name]: parseValue(value, type),
    });
  };

  handleGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ group: event.target.value });
  };

  handleAddIngredient = () => {
    const { name, amount, amountUnit } = this.state;

    if (!name) {
      return;
    }

    this.props.onAdd(name, amount, amountUnit);
    this.setState({
      name: undefined,
      amount: undefined,
      amountUnit: undefined,
    });
  };

  handleAddGroup = () => {
    const { group } = this.state;

    if (!group) {
      return;
    }

    this.props.onAddGroup(group);
    this.setState({ group: undefined });
  };

  render() {
    const { items, ingredientOptions, onRemove, onSort } = this.props;
    const { name, amount, amountUnit, group } = this.state;

    return (
      <div>
        <IngredientList items={items} onRemove={onRemove} onSort={onSort} />
        <IngredientForm
          name={name}
          amount={amount}
          amountUnit={amountUnit}
          ingredientOptions={ingredientOptions}
          onChange={this.handleIngredientChange}
          onAdd={this.handleAddIngredient}
        />
        <IngredientGroupForm
          group={group}
          onChange={this.handleGroupChange}
          onAdd={this.handleAddGroup}
        />
      </div>
    );
  }
}

export default IngredientEdit;

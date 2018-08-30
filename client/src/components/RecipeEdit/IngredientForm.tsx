import React, { KeyboardEvent } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { AutosuggestChangeEventHandler } from '../../types';
import { Input, getInputStyle } from '../elements/Input';
import { Icon } from '../common/Icon';
import { Box } from '../core';
import { Button } from '../elements/Button';
import { autosuggestStyle } from './autosuggestStyle';

type Props = {
  name?: string;
  amount?: number;
  amountUnit?: string;
  ingredientOptions: string[];
  onChange: AutosuggestChangeEventHandler;
  onAdd: () => void;
};

type State = {
  ingredientOptions: string[];
};

export class IngredientForm extends React.Component<Props, State> {
  state = {
    ingredientOptions: [],
  };

  handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    if (value) {
      this.setState({
        ingredientOptions: matchSorter(this.props.ingredientOptions, value),
      });
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ ingredientOptions: [] });
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (this.props.name) {
        this.props.onAdd();
      }
    }
  };

  renderSuggestion = (suggestion: string) => <span>{suggestion}</span>;

  render() {
    const { ingredientOptions } = this.state;
    const { name = '', amount = '', amountUnit = '', onChange, onAdd } = this.props;

    return (
      <>
        <Box display="flex" mb={2}>
          <Box flex={1} pr={1}>
            <Input
              type="number"
              name="amount"
              value={amount}
              onChange={onChange}
              onKeyPress={this.handleKeyPress}
              min="0"
              placeholder="Množství"
            />
          </Box>
          <Box flex={1} pl={1}>
            <Input
              type="text"
              name="amountUnit"
              value={amountUnit}
              onChange={onChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Jednotka"
            />
          </Box>
        </Box>
        <Box display="flex" mb={2}>
          <Box flex="auto" className={autosuggestStyle}>
            <Autosuggest
              suggestions={ingredientOptions}
              onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
              getSuggestionValue={s => s}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                name: 'name',
                value: name,
                onChange: (event, selectEvent) => onChange(event, selectEvent, 'name'),
                onKeyPress: this.handleKeyPress,
                className: getInputStyle({ hasAppendAddon: true }),
                placeholder: 'Název',
              }}
            />
          </Box>
          <Button type="button" onClick={onAdd} disabled={!name} isAppendAddon>
            <Icon icon="plus" /> Přidat
          </Button>
        </Box>
      </>
    );
  }
}

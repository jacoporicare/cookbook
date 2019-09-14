import React, { KeyboardEvent, useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { AutosuggestChangeEventHandler } from '../../types';
import { Input, getInputStyle, Button } from '../elements';
import Icon from '../common/Icon';
import { Box } from '../core';
import autosuggestStyle from './autosuggestStyle';

type Props = {
  name?: string;
  amount?: number | string;
  amountUnit?: string;
  ingredientOptions: string[];
  onChange: AutosuggestChangeEventHandler;
  onAdd: () => void;
};

function IngredientForm({ name = '', amount = '', amountUnit = '', onChange, onAdd }: Props) {
  const [ingredientOptions, setIngredientOptions] = useState<string[]>([]);

  function handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    if (value) {
      setIngredientOptions(matchSorter(ingredientOptions, value));
    }
  }

  function handleSuggestionsClearRequested() {
    setIngredientOptions([]);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (name) {
        onAdd();
      }
    }
  }

  function renderSuggestion(suggestion: string) {
    return <span>{suggestion}</span>;
  }

  return (
    <>
      <Box display="flex" mb={2}>
        <Box flex={1} pr={1}>
          <Input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            onKeyPress={handleKeyPress}
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
            onKeyPress={handleKeyPress}
            placeholder="Jednotka"
          />
        </Box>
      </Box>
      <Box display="flex" mb={2}>
        <Box flex="auto" className={autosuggestStyle}>
          <Autosuggest
            suggestions={ingredientOptions}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            getSuggestionValue={s => s}
            renderSuggestion={renderSuggestion}
            inputProps={{
              name: 'name',
              value: name,
              onChange: (event, selectEvent) => onChange(event, selectEvent, 'name'),
              onKeyPress: handleKeyPress,
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

export default IngredientForm;

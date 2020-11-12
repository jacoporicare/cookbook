import { ClassNames } from '@emotion/core';
import { matchSorter } from 'match-sorter';
import React, { KeyboardEvent, useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';

import { AutosuggestChangeEventHandler } from '../../types';
import Icon from '../common/Icon';
import { Box } from '../core';
import { Input, getInputStyle, Button } from '../elements';

import AutosuggestWrapper from './AutosuggestWrapper';

type Props = {
  name: string | null;
  amount: number | string | null;
  amountUnit: string | null;
  ingredientOptions: string[];
  onChange: AutosuggestChangeEventHandler;
  onAdd: () => void;
};

function IngredientForm({ name, amount, amountUnit, ingredientOptions, onChange, onAdd }: Props) {
  const [ingredientFilter, setIngredientFilter] = useState<string>();

  function handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    if (value) {
      setIngredientFilter(value);
    }
  }

  function handleSuggestionsClearRequested() {
    setIngredientFilter(undefined);
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

  const filteredIngredientOptions = ingredientFilter
    ? matchSorter(ingredientOptions, ingredientFilter)
    : ingredientOptions;

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <Box display="flex" mb={2}>
            <Box flex={1} pr={1}>
              <Input
                min="0"
                name="amount"
                placeholder="Množství"
                type="number"
                value={amount ?? ''}
                onChange={onChange}
                onKeyPress={handleKeyPress}
              />
            </Box>
            <Box flex={1} pl={1}>
              <Input
                name="amountUnit"
                placeholder="Jednotka"
                type="text"
                value={amountUnit ?? ''}
                onChange={onChange}
                onKeyPress={handleKeyPress}
              />
            </Box>
          </Box>
          <Box display="flex" mb={2}>
            <AutosuggestWrapper css={{ flex: 'auto' }}>
              <Autosuggest
                getSuggestionValue={s => s}
                inputProps={{
                  name: 'name',
                  value: name ?? '',
                  onChange: (event, selectEvent) => onChange(event, selectEvent, 'name'),
                  onKeyPress: handleKeyPress,
                  className: getInputStyle(css)({ hasAppendAddon: true }),
                  placeholder: 'Název',
                }}
                renderSuggestion={renderSuggestion}
                suggestions={filteredIngredientOptions}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
              />
            </AutosuggestWrapper>
            <Button disabled={!name} type="button" isAppendAddon onClick={onAdd}>
              <Icon icon="plus" /> Přidat
            </Button>
          </Box>
        </>
      )}
    </ClassNames>
  );
}

export default IngredientForm;

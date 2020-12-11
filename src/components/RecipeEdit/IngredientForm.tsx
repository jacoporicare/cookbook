import { Box, Button, Grid, TextField } from '@material-ui/core';
import { matchSorter } from 'match-sorter';
import React, { KeyboardEvent, useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';

import { AutosuggestChangeEventHandler } from '../../types';
import { useInputStyles } from '../elements';

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
  const inputClasses = useInputStyles();

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
    <>
      <Grid spacing={2} container>
        <Grid item xs>
          <TextField
            inputProps={{ min: 0 }}
            label="Množství"
            name="amount"
            type="number"
            value={amount ?? ''}
            fullWidth
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Jednotka"
            name="amountUnit"
            value={amountUnit ?? ''}
            fullWidth
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid alignItems="flex-end" spacing={2} container>
          <Grid item xs>
            <AutosuggestWrapper css={{ flex: 'auto' }}>
              <Autosuggest
                getSuggestionValue={s => s}
                inputProps={{
                  name: 'name',
                  value: name ?? '',
                  onChange: (event, selectEvent) => onChange(event, selectEvent, 'name'),
                  onKeyPress: handleKeyPress,
                  className: inputClasses.input,
                  placeholder: 'Název',
                }}
                renderSuggestion={renderSuggestion}
                suggestions={filteredIngredientOptions}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
              />
            </AutosuggestWrapper>
          </Grid>
          <Grid item>
            <Button disabled={!name} onClick={onAdd}>
              Přidat
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default IngredientForm;

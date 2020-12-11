import { Box, InputAdornment, TextField } from '@material-ui/core';
import { matchSorter } from 'match-sorter';
import React, { useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import Creatable from 'react-select/creatable';

import { AutosuggestChangeEventHandler } from '../../types';
import { useInputStyles } from '../elements';

import AutosuggestWrapper from './AutosuggestWrapper';

type Props = {
  preparationTime: number | null;
  servingCount: number | null;
  sideDish: string | null;
  sideDishOptions: string[];
  tagOptions: string[];
  tags: string[] | null;
  onChange: AutosuggestChangeEventHandler;
  onTagsChange: (tags: string[]) => void;
};

function BasicInfo({
  preparationTime,
  servingCount,
  sideDish,
  sideDishOptions,
  tagOptions,
  tags,
  onChange,
  onTagsChange,
}: Props) {
  const inputClasses = useInputStyles();

  const [sideDishFilter, setSideDishFilter] = useState<string>();

  function handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    if (value) {
      setSideDishFilter(value);
    }
  }

  function handleSuggestionsClearRequested() {
    setSideDishFilter(undefined);
  }

  const filteredSideDishOptions = sideDishFilter
    ? matchSorter(sideDishOptions, sideDishFilter)
    : sideDishOptions;

  return (
    <>
      <TextField
        InputProps={{ endAdornment: <InputAdornment position="end">min</InputAdornment> }}
        inputProps={{ min: 1 }}
        label="Doba přípravy"
        name="preparationTime"
        type="number"
        value={typeof preparationTime === 'number' ? preparationTime : ''}
        fullWidth
        onChange={onChange}
      />

      <Box mt={3}>
        <TextField
          inputProps={{ min: 1 }}
          label="Počet porcí"
          name="servingCount"
          type="number"
          value={typeof servingCount === 'number' ? servingCount : ''}
          fullWidth
          onChange={onChange}
        />
      </Box>

      <AutosuggestWrapper mt={3}>
        <label htmlFor="sideDish">Příloha</label>
        <Autosuggest
          getSuggestionValue={s => s}
          inputProps={{
            id: 'sideDish',
            name: 'sideDish',
            value: sideDish || '',
            onChange: (event, selectEvent) => onChange(event, selectEvent, 'sideDish'),
            onKeyPress: e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            },
            className: inputClasses.input,
          }}
          renderSuggestion={(s: string) => <span>{s}</span>}
          suggestions={filteredSideDishOptions}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        />
      </AutosuggestWrapper>

      <Box mt={3}>
        <label htmlFor="tags">Štítky</label>
        <Creatable
          defaultValue={tags?.map(t => ({ value: t, label: t }))}
          formatCreateLabel={input => `Vytvořit "${input}"`}
          inputId="tags"
          noOptionsMessage={() => 'Žádné možnosti'}
          options={tagOptions.map(t => ({ value: t, label: t }))}
          placeholder="Vybrat nebo vytvořit..."
          getv
          isClearable
          isMulti
          onChange={values => onTagsChange(values instanceof Array ? values.map(v => v.value) : [])}
        />
      </Box>
    </>
  );
}

export default BasicInfo;

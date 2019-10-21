import React, { useState } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import matchSorter from 'match-sorter';
import { ClassNames } from '@emotion/core';

import { AutosuggestChangeEventHandler } from '../../types';
import { Box } from '../core';
import { Label, Input, getInputStyle, InputAddon } from '../elements';

import AutosuggestWrapper from './AutosuggestWrapper';

type Props = {
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  onChange: AutosuggestChangeEventHandler;
};

function BasicInfo({
  preparationTime,
  servingCount,
  sideDish,
  sideDishOptions: serverSideDishOptions,
  onChange,
}: Props) {
  const [sideDishOptions, setSideDishOptions] = useState<string[]>(serverSideDishOptions);

  function handleSuggestionsFetchRequested({ value }: SuggestionsFetchRequestedParams) {
    if (value) {
      setSideDishOptions(matchSorter(sideDishOptions, value));
    }
  }

  function handleSuggestionsClearRequested() {
    setSideDishOptions(serverSideDishOptions);
  }

  return (
    <ClassNames>
      {({ css }) => (
        <>
          <Box mb={3}>
            <Label htmlFor="preparationTime">Doba přípravy</Label>
            <Box display="flex">
              <Input
                flex="auto"
                id="preparationTime"
                min="1"
                name="preparationTime"
                type="number"
                value={typeof preparationTime === 'number' ? preparationTime : ''}
                hasAppendAddon
                onChange={onChange}
              />
              <InputAddon isAppend>min</InputAddon>
            </Box>
          </Box>

          <Box mb={3}>
            <Label htmlFor="servingCount">Počet porcí</Label>
            <Input
              id="servingCount"
              min="1"
              name="servingCount"
              type="number"
              value={typeof servingCount === 'number' ? servingCount : ''}
              onChange={onChange}
            />
          </Box>

          <AutosuggestWrapper>
            <Label htmlFor="sideDish">Příloha</Label>
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
                className: getInputStyle(css)(),
              }}
              renderSuggestion={(s: string) => <span>{s}</span>}
              suggestions={sideDishOptions}
              onSuggestionsClearRequested={handleSuggestionsClearRequested}
              onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            />
          </AutosuggestWrapper>
        </>
      )}
    </ClassNames>
  );
}

export default BasicInfo;

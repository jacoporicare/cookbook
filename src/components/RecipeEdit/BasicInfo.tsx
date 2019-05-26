import React from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { AutosuggestChangeEventHandler } from '../../types';
import { Box } from '../core';
import { Label, Input, getInputStyle, InputAddon } from '../elements';
import autosuggestStyle from './autosuggestStyle';

type Props = {
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  onChange: AutosuggestChangeEventHandler;
};

type State = {
  sideDishOptions: string[];
};

export default class BasicInfo extends React.Component<Props, State> {
  state = {
    sideDishOptions: [],
  };

  handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    if (value) {
      this.setState({
        sideDishOptions: matchSorter(this.props.sideDishOptions, value),
      });
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ sideDishOptions: [] });
  };

  render() {
    const { preparationTime, servingCount, sideDish, onChange } = this.props;
    const { sideDishOptions } = this.state;

    return (
      <>
        <Box mb={3}>
          <Label htmlFor="preparationTime">Doba přípravy</Label>
          <Box display="flex">
            <Input
              type="number"
              min="1"
              id="preparationTime"
              name="preparationTime"
              value={typeof preparationTime === 'number' ? preparationTime : ''}
              onChange={onChange}
              flex="auto"
              hasAppendAddon
            />
            <InputAddon isAppend>min</InputAddon>
          </Box>
        </Box>

        <Box mb={3}>
          <Label htmlFor="servingCount">Počet porcí</Label>
          <Input
            type="number"
            min="1"
            id="servingCount"
            name="servingCount"
            value={typeof servingCount === 'number' ? servingCount : ''}
            onChange={onChange}
          />
        </Box>

        <Box className={autosuggestStyle}>
          <Label htmlFor="sideDish">Příloha</Label>
          <Autosuggest
            suggestions={sideDishOptions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            getSuggestionValue={s => s}
            renderSuggestion={(s: string) => <span>{s}</span>}
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
              className: getInputStyle(),
            }}
          />
        </Box>
      </>
    );
  }
}

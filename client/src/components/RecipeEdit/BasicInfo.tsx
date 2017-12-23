import React from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import removeDiacritics from 'javascript-remove-diacritics';

import { AutosuggestChangeEventHandler } from '../../types';

interface Props {
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  onChange: AutosuggestChangeEventHandler;
}

interface State {
  sideDishOptions: string[];
}

class BasicInfo extends React.Component<Props, State> {
  handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    if (!value) {
      return;
    }

    const valueLowerCase = removeDiacritics.replace(value).toLowerCase();
    this.setState({
      sideDishOptions: this.props.sideDishOptions.filter(sd =>
        removeDiacritics
          .replace(sd)
          .toLowerCase()
          .includes(valueLowerCase),
      ),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ sideDishOptions: [] });
  };

  render() {
    const {
      preparationTime = '',
      servingCount = '',
      sideDish = '',
      sideDishOptions,
      onChange,
    } = this.props;
    return (
      <div>
        <div className="form-group">
          <label htmlFor="preparationTime">Doba přípravy</label>
          <div className="input-group">
            <input
              type="number"
              min="1"
              id="preparationTime"
              name="preparationTime"
              value={preparationTime}
              onChange={onChange}
              className="form-control"
            />
            <span className="input-group-addon">min</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="servingCount">Počet porcí</label>
          <input
            type="number"
            min="1"
            id="servingCount"
            name="servingCount"
            value={servingCount}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sideDish">Příloha</label>
          <Autosuggest
            suggestions={sideDishOptions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            getSuggestionValue={s => s}
            renderSuggestion={(s: string) => <span>{s}</span>}
            inputProps={{
              id: 'sideDish',
              name: 'sideDish',
              value: sideDish,
              onChange: (event, selectEvent) => onChange(event, selectEvent, 'sideDish'),
              onKeyPress: e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              },
              className: 'form-control',
            }}
          />
        </div>
      </div>
    );
  }
}

export default BasicInfo;

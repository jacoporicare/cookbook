import React, { FormEvent } from 'react';
import Autosuggest, {
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
} from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { Recipe } from '../../types';
import SearchInput from '../SearchInput/SearchInput';

type Props = {
  recipes: Recipe[];
  onSelected: (slug: string) => void;
};

type State = {
  value: string;
  suggestions: Recipe[];
};

export default class RecipeSearch extends React.Component<Props, State> {
  state = {
    value: '',
    suggestions: [],
  };

  componentWillReceiveProps(nextProps: Props) {
    const { value } = this.state;

    if (value) {
      this.setState({
        suggestions: matchSorter(nextProps.recipes, value, { keys: ['title'] }),
      });
    }
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  handleFetch = ({ value }: SuggestionsFetchRequestedParams) => {
    const { recipes } = this.props;

    this.setState({
      suggestions: matchSorter(recipes, value, { keys: ['title'] }),
    });
  };

  handleClear = () => {
    this.setState({ suggestions: [] });
  };

  handleSelected = (
    event: FormEvent<HTMLInputElement>,
    { suggestion }: SuggestionSelectedEventData<Recipe>,
  ) => {
    this.props.onSelected(suggestion.slug);
    this.setState({ value: '', suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;

    return (
      <SearchInput>
        <Autosuggest
          suggestions={suggestions}
          highlightFirstSuggestion
          onSuggestionsFetchRequested={this.handleFetch}
          onSuggestionsClearRequested={this.handleClear}
          onSuggestionSelected={this.handleSelected}
          getSuggestionValue={(r: Recipe) => r.title}
          renderSuggestion={(r: Recipe) => <span>{r.title}</span>}
          inputProps={{
            value: value,
            onChange: this.handleChange,
            placeholder: 'Hledat recept',
            className: 'form-control',
          }}
        />
      </SearchInput>
    );
  }
}

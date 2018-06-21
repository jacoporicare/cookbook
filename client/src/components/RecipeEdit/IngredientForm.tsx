import React, { KeyboardEvent } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import matchSorter from 'match-sorter';

import { AutosuggestChangeEventHandler } from '../../types';

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

class IngredientForm extends React.Component<Props, State> {
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
      <div className="panel panel-default">
        <div className="panel-heading">Přidat ingredienci</div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-6">
              <div className="form-group">
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={onChange}
                  onKeyPress={this.handleKeyPress}
                  min="0"
                  className="form-control"
                  placeholder="Množství"
                />
              </div>
            </div>
            <div className="col-xs-6">
              <div className="form-group">
                <input
                  type="text"
                  name="amountUnit"
                  value={amountUnit}
                  onChange={onChange}
                  onKeyPress={this.handleKeyPress}
                  className="form-control"
                  placeholder="Jednotka"
                />
              </div>
            </div>
          </div>
          <div className="form-group cb-last">
            <div className="input-group">
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
                  className: 'form-control',
                  placeholder: 'Název',
                }}
              />
              <div className="input-group-btn">
                <button type="button" onClick={onAdd} className="btn btn-primary" disabled={!name}>
                  <i className="fa fa-plus" /> Přidat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientForm;

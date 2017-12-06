import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import removeDiacritics from 'javascript-remove-diacritics';

class IngredientForm extends Component {
  static propTypes = {
    ingredient: PropTypes.object.isRequired,
    ingredientOptions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ingredientOptions: [],
    };
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    if (value) {
      const valueLowerCase = removeDiacritics.replace(value).toLowerCase();
      this.setState({
        ingredientOptions: this.props.ingredientOptions.filter(i =>
          removeDiacritics
            .replace(i)
            .toLowerCase()
            .includes(valueLowerCase),
        ),
      });
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ ingredientOptions: [] });
  };

  handleKeyPress = event => {
    if (event.which === 13) {
      event.preventDefault();

      if (this.props.ingredient.name) {
        this.props.onAdd(event);
      }
    }
  };

  renderSuggestion = suggestion => <span>{suggestion}</span>;

  render() {
    const { ingredientOptions } = this.state;
    const { ingredient, onChange, onAdd } = this.props;
    const { name, amount, amountUnit } = ingredient;

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

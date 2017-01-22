import React, { PropTypes } from 'react';
import { parseValue } from '../../utils';
import IngredientsList from './IngredientsList';
import IngredientsForm from './IngredientsForm';
import IngredientsGroupForm from './IngredientsGroupForm';

const initialIngredient = {
  name: '',
  amount: '',
  amountUnit: '',
};

class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: initialIngredient,
      group: '',
    };
  }

  handleIngredientChange = (event, selectEvent, targetName) => {
    const name = targetName || event.target.name;
    const value = selectEvent ? selectEvent.newValue : event.target.value;
    const type = event.target.type;

    this.setState(({ ingredient }) => ({
      ingredient: {
        ...ingredient,
        [name]: parseValue(value, type),
      },
    }));
  }

  handleGroupChange = (event) => {
    this.setState({ group: event.target.value });
  }

  handleAddIngredient = (event) => {
    this.props.onAdd(event, this.state.ingredient);
    this.setState({ ingredient: initialIngredient });
  }

  handleAddGroup = (event) => {
    this.props.onAddGroup(event, this.state.group);
    this.setState({ group: '' });
  }

  render() {
    const { items, ingredientOptions, onRemove, onSort } = this.props;
    const { ingredient, group } = this.state;

    return (
      <div>
        {items.length > 0 ?
          <IngredientsList
            items={items}
            onRemove={onRemove}
            onSort={onSort}
          /> :
          <div className="alert alert-info">Zatím žádné ingredience.</div>
        }
        <IngredientsForm
          ingredient={ingredient}
          ingredientOptions={ingredientOptions}
          onChange={this.handleIngredientChange}
          onAdd={this.handleAddIngredient}
        />
        <IngredientsGroupForm
          group={group}
          onChange={this.handleGroupChange}
          onAdd={this.handleAddGroup}
        />
      </div>
    );
  }
}

Ingredients.propTypes = {
  items: PropTypes.array.isRequired,
  ingredientOptions: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onAddGroup: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Ingredients;

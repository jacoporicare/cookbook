import React, { PropTypes } from 'react';
import { parseValue } from '../../util';
import IngredientsList from './IngredientsList';
import IngredientsForm from './IngredientsForm';
import IngredientsGroupForm from './IngredientsGroupForm';

const initialIngredient = {
  name: '',
  amount: '',
  amountUnit: ''
};

class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: initialIngredient,
      group: ''
    };

    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
  }

  handleIngredientChange(event) {
    const { name, value } = event.target;
    this.setState({
      ingredient: {
        ...this.state.ingredient,
        [name]: parseValue(value, event.target.type)
      }
    });
  }

  handleGroupChange(event) {
    this.setState({ group: event.target.value });
  }

  handleAddIngredient(event) {
    this.props.onAdd(event, this.state.ingredient);
    this.setState({ ingredient: initialIngredient });
  }

  handleAddGroup(event) {
    this.props.onAddGroup(event, this.state.group);
    this.setState({ group: '' });
  }

  render() {
    const { items, onRemove, onSort } = this.props;
    const { ingredient, group } = this.state;

    return (
      <div>
        <IngredientsList
          items={items}
          onRemove={onRemove}
          onSort={onSort}
        />
        <IngredientsForm
          ingredient={ingredient}
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
  onAdd: PropTypes.func.isRequired,
  onAddGroup: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Ingredients;

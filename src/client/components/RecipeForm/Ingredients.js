import React, { PropTypes } from 'react';
import IngredientsList from './IngredientsList';
import IngredientsForm from './IngredientsForm';
import IngredientsGroupForm from './IngredientsGroupForm';

const Ingredients = ({ items, onAdd, onAddGroup, onRemove }) => {
  return (
    <div>
      <IngredientsList items={items} onRemove={onRemove} />
      <IngredientsForm onAdd={onAdd} />
      <IngredientsGroupForm onAdd={onAddGroup} />
    </div>
  );
};

Ingredients.propTypes = {
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onAddGroup: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Ingredients;

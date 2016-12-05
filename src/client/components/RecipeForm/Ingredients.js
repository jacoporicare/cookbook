import React, { PropTypes } from 'react';
import IngredientsList from './IngredientsList';
import IngredientsForm from './IngredientsForm';

const Ingredients = ({ items, onAdd, onAddGroup, onRemove }) => {
  return (
    <div>
      <IngredientsList items={items} onRemove={onRemove} />
      <IngredientsForm onAdd={onAdd} onAddGroup={onAddGroup} />
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

import React, { PropTypes } from 'react';
import RecipeListItem from './RecipeListItem.js';

const RecipeList = ({ recipes }) => {
  return (
    <ul>
      {recipes.map(recipe =>
        <RecipeListItem recipe={recipe} key={recipe.id} />
      )}
    </ul>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

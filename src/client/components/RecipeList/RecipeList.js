import React, { PropTypes } from 'react';
import RecipeListItem from './RecipeListItem.js';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes.map(recipe =>
        <RecipeListItem recipe={recipe} key={recipe.id} />
      )}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

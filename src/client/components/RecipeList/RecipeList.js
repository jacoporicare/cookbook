import React, { PropTypes } from 'react';
import RecipeListItem from './RecipeListItem';
import './RecipeList.scss';

const RecipeList = ({ recipes }) => (
  <div className="cb-recipes">
    {recipes.map(recipe => (
      <RecipeListItem recipe={recipe} key={recipe._id} />
    ))}
    {!recipes.length &&
      <div className="alert alert-info">
        Zatím zde není žádný recept.
      </div>
    }
  </div>
);

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;

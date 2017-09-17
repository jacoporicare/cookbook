import React from 'react';
import PropTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes }) => (
  <div className="row">
    {recipes.map(recipe => <RecipeListItem recipe={recipe} key={recipe._id} />)}
    {!recipes.length && (
      <div className="alert alert-info">Zatím zde není žádný recept.</div>
    )}
  </div>
);

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeList;

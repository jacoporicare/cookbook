import React, { PropTypes } from 'react';
import RecipeListItem from './RecipeListItem';
import './RecipeList.scss';

const RecipeList = ({ recipes }) => {
  return (
    <div className="cb-recipes">
      <div className="row">
        {recipes.map(recipe =>
          <RecipeListItem recipe={recipe} key={recipe._id} />
        )}
      </div>
      {!recipes.length &&
        <div className="alert alert-info">
          Zatím zde není žádný recept.
        </div>
      }
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

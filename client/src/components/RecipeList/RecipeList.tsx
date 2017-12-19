import React from 'react';

import { Recipe } from '../../types';
import RecipeListItem from './RecipeListItem';

interface Props {
  recipes: Recipe[];
}

const RecipeList = ({ recipes }: Props) => (
  <div className="row">
    {recipes.map(recipe => <RecipeListItem recipe={recipe} key={recipe._id} />)}
    {!recipes.length && <div className="alert alert-info">Zatím zde není žádný recept.</div>}
  </div>
);

export default RecipeList;

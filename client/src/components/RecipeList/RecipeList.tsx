import React from 'react';

import { Recipe } from '../../types';
import RecipeListItem from './RecipeListItem';

type Props = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: Props) {
  return (
    <div className="row">
      {recipes.map(recipe => (
        <RecipeListItem recipe={recipe} key={recipe._id} />
      ))}
      {!recipes.length && <div className="alert alert-info">Zatím zde není žádný recept.</div>}
    </div>
  );
}

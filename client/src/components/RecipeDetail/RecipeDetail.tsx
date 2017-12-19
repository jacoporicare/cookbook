import React from 'react';

import { Ingredient } from '../../types';
import RichText from '../RichText/RichText';
import IngredientList from './IngredientList';

interface Props {
  ingredients?: Ingredient[];
  servingCount?: number;
  directions?: string;
}

const RecipeDetail = ({ ingredients, servingCount, directions }: Props) => (
  <div className="cb-recipe-detail">
    <div className="row">
      <div className="col-md-3 col-sm-4">
        <IngredientList ingredients={ingredients} servingCount={servingCount} />
      </div>

      <div className="col-md-9 col-sm-8">
        {directions ? (
          <RichText text={directions} />
        ) : (
          <div className="alert alert-info">Žádný postup.</div>
        )}
      </div>
    </div>
  </div>
);

export default RecipeDetail;

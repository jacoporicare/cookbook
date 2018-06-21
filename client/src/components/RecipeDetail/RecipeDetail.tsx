import React from 'react';

import { Ingredient } from '../../types';
import RichText from '../RichText/RichText';
import IngredientList from './IngredientList';

import './styles/RecipeDetail.module.css';

type Props = {
  ingredients?: Ingredient[];
  servingCount?: number;
  directions?: string;
  userName: string;
  lastModifiedDate: string;
};

const RecipeDetail = ({
  ingredients,
  servingCount,
  directions,
  userName,
  lastModifiedDate,
}: Props) => (
  <div className="cb-recipe-detail">
    <div className="row">
      <div className="col-md-3 col-sm-4">
        <IngredientList ingredients={ingredients} servingCount={servingCount} />
        <p styleName="info">
          <i className="fa fa-user text-muted" /> {userName},{' '}
          {new Date(lastModifiedDate).toLocaleDateString('cs')}
        </p>
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

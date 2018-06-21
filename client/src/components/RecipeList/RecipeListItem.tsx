import React from 'react';
import { Link } from 'react-router';

import { Recipe } from '../../types';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

import './RecipeList.module.scss';

type Props = {
  recipe: Recipe;
};

const RecipeListItem = ({ recipe }: Props) => {
  const { slug, title, preparationTime, sideDish } = recipe;

  return (
    <div className="col-sm-6 col-md-4">
      <Link to={`/recept/${slug}`} styleName="box">
        <h4 styleName="title">{title}</h4>
        <div styleName="info">
          <RecipeInfo
            preparationTime={preparationTime}
            sideDish={sideDish}
            placeholder="žádné údaje"
          />
        </div>
      </Link>
    </div>
  );
};

export default RecipeListItem;

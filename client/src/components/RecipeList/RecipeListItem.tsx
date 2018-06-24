import React from 'react';
import { Link } from 'react-router';

import { Recipe } from '../../types';
import { getImageUrl } from '../../utils';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

import placeholder from './food-placeholder.png';

import './RecipeList.module.scss';

type Props = {
  recipe: Recipe;
};

const RecipeListItem = ({ recipe }: Props) => {
  const { slug, title, preparationTime, sideDish, hasImage, lastModifiedDate } = recipe;

  const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : placeholder;

  return (
    <div className="col-sm-6 col-md-4">
      <Link to={`/recept/${slug}`} styleName="box">
        <div styleName="image" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div styleName="box-inner">
          <h4 styleName="title">{title}</h4>
          <div styleName="info">
            <RecipeInfo
              preparationTime={preparationTime}
              sideDish={sideDish}
              placeholder="žádné údaje"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeListItem;

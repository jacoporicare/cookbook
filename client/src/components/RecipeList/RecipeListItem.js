import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import './RecipeList.module.scss';

const RecipeListItem = ({ recipe }) => {
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

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    preparationTime: PropTypes.number,
    sideDish: PropTypes.string,
  }).isRequired,
};

export default RecipeListItem;

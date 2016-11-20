import React, { PropTypes } from 'react';
import Header from './Header';
import Ingredients from './Ingredients';
import RichText from '../RichText/RichText';

const RecipeDetail = ({ recipe }) => {
  const { slug, title, preparationTime, sideDish, ingredients, directions } = recipe;

  return (
    <div className="container">
      <Header
        slug={slug}
        title={title}
        preparationTime={preparationTime}
        sideDish={sideDish}
      />
      <div className="cb-recipe-detail">
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <h3>Ingredience</h3>
            <Ingredients ingredients={ingredients} />
          </div>

          <div className="col-md-9 col-sm-8">
            <h3>Postup</h3>
            <RichText text={directions} />
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeDetail;

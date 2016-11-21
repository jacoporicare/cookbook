import React, { PropTypes } from 'react';
import Ingredients from './Ingredients';
import RichText from '../RichText/RichText';

const RecipeDetail = ({ ingredients, directions }) => {
  return (
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
  );
};

RecipeDetail.propTypes = {
  ingredients: PropTypes.array,
  directions: PropTypes.string
};

export default RecipeDetail;

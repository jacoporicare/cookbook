import React, { PropTypes } from 'react';
import Ingredients from './Ingredients';
import RichText from '../RichText/RichText';

const RecipeDetail = ({ ingredients, directions }) => (
  <div className="cb-recipe-detail">
    <div className="row">
      <div className="col-md-3 col-sm-4">
        <h3>Ingredience</h3>
        {ingredients && ingredients.length > 0
          ? <Ingredients ingredients={ingredients} />
          : <div className="alert alert-info">Žádné ingredience.</div>
        }
      </div>

      <div className="col-md-9 col-sm-8">
        <h3>Postup</h3>
        {directions
          ? <RichText text={directions} />
          : <div className="alert alert-info">Žádný postup.</div>
        }
      </div>
    </div>
  </div>
);

RecipeDetail.propTypes = {
  ingredients: PropTypes.array,
  directions: PropTypes.string
};

export default RecipeDetail;

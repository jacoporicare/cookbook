import React, { PropTypes } from 'react';

const RecipeDetail = ({ recipe }) => {
  const { title } = recipe;

  return (
    <div className="container">
      {title}
    </div>
  );
};

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeDetail;

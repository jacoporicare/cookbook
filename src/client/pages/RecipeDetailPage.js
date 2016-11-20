import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';

const RecipeDetailPage = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="container">
        Nahrávání&hellip;
      </div>
    );
  }

  return (
    <RecipeDetail recipe={recipe} />
  );
};

RecipeDetailPage.propTypes = {
  recipe: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let recipe;

  const { slug } = ownProps.params;
  if (slug && state.recipes.length) {
    recipe = state.recipes.find(r => r.slug == slug);
  }

  return {
    recipe
  };
}

export default connect(
  mapStateToProps
)(RecipeDetailPage);

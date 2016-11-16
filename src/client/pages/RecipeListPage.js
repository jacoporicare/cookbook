import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RecipeList from '../components/RecipeList/RecipeList';

const RecipeListPage = ({ recipes }) => {
  return (
    <div className="container">
      <RecipeList recipes={recipes} />
    </div>
  );
};

RecipeListPage.propTypes = {
  recipes: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

export default connect(
  mapStateToProps
)(RecipeListPage);

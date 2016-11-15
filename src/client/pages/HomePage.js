import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RecipeList from '../components/RecipeList/RecipeList';

const HomePage = ({ recipes }) => {
  return (
    <RecipeList recipes={recipes} />
  );
};

HomePage.propTypes = {
  recipes: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes
  };
}

export default connect(
  mapStateToProps
)(HomePage);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../actions/recipeDetailsActions';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import Spinner from '../components/Spinner/Spinner';

class RecipeEditPage extends React.Component {
  componentDidMount() {
    this.props.loadRecipe(this.props.slug);
  }

  render() {
    const { recipe, isFetching } = this.props;

    if (!recipe) {
      return (
        <div className="container">
          {isFetching
            ? <Spinner />
            : <div className="alert alert-danger">Recept nenalezen.</div>
          }
        </div>
      );
    }

    const { slug, title, preparationTime, sideDish, ingredients, directions } = recipe;

    return (
      <div className="container">
        <RecipeForm recipe={recipe} />
      </div>
    );
  }
}

RecipeEditPage.propTypes = {
  slug: PropTypes.string.isRequired,
  recipe: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loadRecipe: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { recipeDetails } = state;
  const { slug } = ownProps.params;
  const recipeDetail = recipeDetails[slug] || { isFetching: true };

  return {
    slug,
    recipe: recipeDetail.recipe,
    isFetching: recipeDetail.isFetching
  };
}

export default connect(mapStateToProps, {
  loadRecipe
})(RecipeEditPage);

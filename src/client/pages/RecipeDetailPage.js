import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../actions/recipeDetailsActions';
import { findRecipeBySlug } from '../reducers/recipesReducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import Spinner from '../components/Spinner/Spinner';

class RecipeDetailPage extends React.Component {
  componentDidMount() {
    this.props.loadRecipe(this.props.slug);
  }

  render() {
    const { recipe, isFetching, hasDetail } = this.props;

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
        <RecipeHeader slug={slug} title={title} preparationTime={preparationTime} sideDish={sideDish} />
        {isFetching && !hasDetail
          ? <Spinner />
          : <RecipeDetail ingredients={ingredients} directions={directions} />
        }
      </div>
    );
  }
}

RecipeDetailPage.propTypes = {
  slug: PropTypes.string.isRequired,
  recipe: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loadRecipe: PropTypes.func.isRequired,
  hasDetail: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  const { recipeDetails } = state;
  const { slug } = ownProps.params;
  const recipeDetail = recipeDetails[slug] || { isFetching: true };
  const recipe = recipeDetail.recipe || findRecipeBySlug(state, slug);

  return {
    slug,
    recipe,
    isFetching: recipeDetail.isFetching,
    hasDetail: !!recipeDetail.recipe
  };
}

export default connect(mapStateToProps, {
  loadRecipe
})(RecipeDetailPage);

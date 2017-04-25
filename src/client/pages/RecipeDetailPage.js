import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loadRecipe, deleteRecipe } from '../actions/recipeDetailsActions';
import { findRecipeBySlug } from '../reducers/recipesReducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';
import Spinner from '../components/Spinner/Spinner';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

class RecipeDetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
    };
  }

  componentWillMount() {
    this.props.loadRecipe(this.props.slug);
  }

  handleDeleteShow = () => {
    this.setState({
      showDeleteModal: true,
    });
  }

  handleDeleteClose = () => {
    this.setState({
      showDeleteModal: false,
    });
  }

  handleDeleteConfirm = () => {
    this.props.deleteRecipe(this.props.recipe._id);
    toastr.success('Recept úspěšně smazán');
    this.props.router.push('/');
  }

  render() {
    const { recipe, isFetching, hasDetail } = this.props;

    if (!recipe) {
      return (
        <div className="container">
          <SpinnerAlert level="danger" text="Recept nenalezen." spinner={isFetching} />
        </div>
      );
    }

    const { showDeleteModal } = this.state;
    const {
      slug,
      title,
      preparationTime,
      sideDish,
      ingredients,
      directions,
    } = recipe;

    return (
      <div>
        <div className="container">
          <RecipeHeader
            slug={slug}
            title={title}
            preparationTime={preparationTime}
            sideDish={sideDish}
            onDeleteShow={this.handleDeleteShow}
          />
          {isFetching && !hasDetail ?
            <Spinner /> :
            <RecipeDetail ingredients={ingredients} directions={directions} />
          }
        </div>
        <RecipeDeleteModal
          show={showDeleteModal}
          recipeTitle={title}
          onClose={this.handleDeleteClose}
          onConfirm={this.handleDeleteConfirm}
        />
      </div>
    );
  }
}

RecipeDetailPage.propTypes = {
  slug: PropTypes.string.isRequired,
  recipe: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  loadRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  hasDetail: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { recipeDetails } = state;
  const { slug } = ownProps.params;
  const recipeDetail = recipeDetails[slug] || {};
  const {
    isFetching = true,
    recipe = findRecipeBySlug(state, slug),
  } = recipeDetail;

  return {
    slug,
    isFetching,
    recipe,
    hasDetail: !!recipeDetail.recipe,
  };
};

const mapDispatchToProps = {
  loadRecipe,
  deleteRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPage);

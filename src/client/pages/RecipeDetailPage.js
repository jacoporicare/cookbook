import React, { PropTypes } from 'react';
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
      showDeleteModal: false
    };

    this.handleDeleteShow = this.handleDeleteShow.bind(this);
    this.handleDeleteClose = this.handleDeleteClose.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  componentDidMount() {
    this.props.loadRecipe(this.props.slug);
  }

  handleDeleteShow() {
    this.setState({
      showDeleteModal: true
    });
  }

  handleDeleteClose() {
    this.setState({
      showDeleteModal: false
    });
  }

  handleDeleteConfirm() {
    this.props.deleteRecipe(this.props.recipe._id)
      .then(action => this.handleDelete(action));
  }

  handleDelete(action) {
    if (action.isSuccess) {
      toastr.success('Recept úspěšně smazán');
      this.props.router.push('/');
    }
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
      directions
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
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { recipeDetails } = state;
  const { slug } = ownProps.params;
  const recipeDetail = recipeDetails[slug] || {};
  const {
    isFetching = true,
    recipe = findRecipeBySlug(state, slug)
  } = recipeDetail;

  return {
    slug,
    isFetching,
    recipe,
    hasDetail: !!recipeDetail.recipe
  };
}

export default connect(mapStateToProps, {
  loadRecipe,
  deleteRecipe
})(RecipeDetailPage);

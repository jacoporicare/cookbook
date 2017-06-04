import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { fetchRecipe } from '../components/RecipeDetail/actions';
import { deleteRecipe } from '../components/RecipeDeleteModal/actions';
import { findRecipeBySlug } from '../components/RecipeList/reducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';
import Spinner from '../components/Spinner/Spinner';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

class RecipeDetailPage extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    recipe: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    fetchRecipe: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    hasDetail: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false,
    };
  }

  componentWillMount() {
    this.props.fetchRecipe(this.props.slug);
  }

  handleDeleteShow = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  handleDeleteClose = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  handleDeleteConfirm = () => {
    this.props.deleteRecipe(this.props.recipe._id).then(() => {
      toastr.success('Recept úspěšně smazán');
      this.props.router.push('/');
    });
  };

  render() {
    const { recipe, isFetching, hasDetail } = this.props;

    if (!recipe) {
      return (
        <div className="container">
          <SpinnerAlert
            level="danger"
            text="Recept nenalezen."
            spinner={isFetching}
          />
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
      servingCount,
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
          {isFetching && !hasDetail
            ? <Spinner />
            : <RecipeDetail
                ingredients={ingredients}
                servingCount={servingCount}
                directions={directions}
              />}
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

const mapStateToProps = (state, ownProps) => {
  const { isFetching, recipesBySlug } = state.recipeDetail;
  const { slug } = ownProps.params;
  const recipe = recipesBySlug[slug] || findRecipeBySlug(state, slug);
  const hasDetail = Boolean(recipesBySlug[slug]);

  return {
    slug,
    isFetching,
    recipe,
    hasDetail,
  };
};

const mapDispatchToProps = {
  fetchRecipe,
  deleteRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPage);

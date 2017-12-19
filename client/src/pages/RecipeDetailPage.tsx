import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import toastr from 'toastr';

import { StoreState, RecipeDetail as RecipeDetailType } from '../types';
import { fetchRecipe, RecipeDetailAction } from '../components/RecipeDetail/actions';
import { deleteRecipe, RecipeDeleteAction } from '../components/RecipeDeleteModal/actions';
import { findRecipeBySlug } from '../components/RecipeList/reducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';
import Spinner from '../components/Spinner/Spinner';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

interface Params {
  slug: string;
}

interface Props extends RouteComponentProps<Params, {}> {
  slug: string;
  recipe: RecipeDetailType;
  isFetching: boolean;
  fetchRecipe: (slug: string) => Promise<RecipeDetailAction>;
  deleteRecipe: (id: string) => Promise<RecipeDeleteAction>;
  hasDetail: boolean;
}

interface State {
  showDeleteModal: boolean;
}

class RecipeDetailPage extends Component<Props, State> {
  state = {
    showDeleteModal: false,
  };

  componentDidMount() {
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
          {isFetching && !hasDetail ? (
            <Spinner />
          ) : (
            <RecipeDetail
              ingredients={ingredients}
              servingCount={servingCount}
              directions={directions}
            />
          )}
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

const mapStateToProps = (state: StoreState, ownProps: RouteComponentProps<Params, {}>) => {
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

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  fetchRecipe: (slug: string) => dispatch(fetchRecipe(slug)),
  deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPage);

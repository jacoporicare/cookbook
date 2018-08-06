import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { StoreState, RecipeDetail as RecipeDetailType } from '../types';
import { getImageUrl } from '../utils';
import DocumentTitle from '../components/DocumentTitle/DocumentTitle';
import { fetchRecipe, RecipeDetailAction } from '../components/RecipeDetail/actions';
import { deleteRecipe, RecipeDeleteAction } from '../components/RecipeDeleteModal/actions';
import { findRecipeBySlug } from '../components/RecipeList/reducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';
import Spinner from '../components/Spinner/Spinner';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

type Params = {
  slug: string;
};

type StateProps = {
  hasDetail: boolean;
  isFetching: boolean;
  recipe: RecipeDetailType;
  slug: string;
  isAuthenticated: boolean;
};

type DispatchProps = {
  deleteRecipe: (id: string) => Promise<RecipeDeleteAction>;
  fetchRecipe: (slug: string) => Promise<RecipeDetailAction>;
};

type Props = StateProps & DispatchProps & RouteComponentProps<Params, {}>;

type State = {
  showDeleteModal: boolean;
};

class RecipeDetailPage extends Component<Props, State> {
  state = {
    showDeleteModal: false,
  };

  componentDidMount() {
    this.props.fetchRecipe(this.props.slug);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.slug !== this.props.slug) {
      this.props.fetchRecipe(nextProps.slug);
    }
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
      this.props.router.push('/');
    });
  };

  render() {
    const { recipe, isFetching, hasDetail, isAuthenticated } = this.props;

    if (!recipe) {
      return (
        <div className="container">
          <SpinnerAlert level="danger" text="Recept nenalezen." spinner={isFetching} />
        </div>
      );
    }

    const { showDeleteModal } = this.state;
    const {
      directions,
      ingredients,
      lastModifiedDate,
      preparationTime,
      servingCount,
      sideDish,
      slug,
      title,
      hasImage,
    } = recipe;

    const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : undefined;
    const imageFullUrl = hasImage ? getImageUrl(slug, lastModifiedDate, 'full') : undefined;

    return (
      <>
        <DocumentTitle title={title} />
        <div className="container">
          <RecipeHeader
            preparationTime={preparationTime}
            sideDish={sideDish}
            slug={slug}
            title={title}
            isAuthenticated={isAuthenticated}
            onDeleteShow={this.handleDeleteShow}
          />
          {isFetching && !hasDetail ? (
            <Spinner />
          ) : (
            <RecipeDetail
              ingredients={ingredients}
              servingCount={servingCount}
              directions={directions}
              lastModifiedDate={lastModifiedDate}
              imageUrl={imageUrl}
              imageFullUrl={imageFullUrl}
            />
          )}
        </div>
        <RecipeDeleteModal
          show={showDeleteModal}
          recipeTitle={title}
          onClose={this.handleDeleteClose}
          onConfirm={this.handleDeleteConfirm}
        />
      </>
    );
  }
}

function mapStateToProps(state: StoreState, ownProps: RouteComponentProps<Params, {}>): StateProps {
  const { isFetching, recipesBySlug } = state.recipeDetail;
  const { isAuthenticated } = state.auth;
  const { slug } = ownProps.params;
  const recipe = recipesBySlug[slug] || findRecipeBySlug(state, slug);
  const hasDetail = Boolean(recipesBySlug[slug]);

  return {
    hasDetail,
    isFetching,
    recipe,
    slug,
    isAuthenticated,
  };
}

function mapDispatchToProps(dispatch: Dispatch<StoreState>): DispatchProps {
  return {
    fetchRecipe: (slug: string) => dispatch(fetchRecipe(slug)),
    deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeDetailPage);

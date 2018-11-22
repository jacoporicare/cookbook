import React, { Component } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router';

import { StoreState, RecipeDetail as RecipeDetailType, User } from '../types';
import { getImageUrl } from '../utils';
import { DangerAlert } from '../components/elements';
import Spinner from '../components/common/Spinner';
import SpinnerIf from '../components/common/SpinnerIf';
import DocumentTitle from '../components/common/DocumentTitle';
import { fetchRecipe, RecipeDetailAction } from '../components/RecipeDetail/actions';
import { deleteRecipe, RecipeDeleteAction } from '../components/RecipeDeleteModal/actions';
import { findRecipeBySlug } from '../components/RecipeList/reducer';
import RecipeHeader from '../components/RecipeDetail/RecipeHeader';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import RecipeDeleteModal from '../components/RecipeDeleteModal/RecipeDeleteModal';

type Params = {
  slug: string;
};

type StateProps = {
  hasDetail: boolean;
  isFetching: boolean;
  recipe: RecipeDetailType;
  slug: string;
  isAuthenticated: boolean;
  user?: User;
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
    const { recipe, isFetching, hasDetail, isAuthenticated, user } = this.props;

    if (!recipe) {
      return (
        <SpinnerIf spinner={isFetching}>
          <DangerAlert>Recept nenalezen.</DangerAlert>
        </SpinnerIf>
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
      userId,
      userName,
    } = recipe;

    const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : undefined;
    const imageFullUrl = hasImage ? getImageUrl(slug, lastModifiedDate, 'full') : undefined;

    return (
      <>
        <DocumentTitle title={title} />
        <RecipeHeader
          preparationTime={preparationTime}
          sideDish={sideDish}
          slug={slug}
          title={title}
          isAuthenticated={isAuthenticated}
          isAuthor={user && (user.id === userId || user.id === 1 || user.id === 2)}
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
            userName={userName}
          />
        )}
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
  const { isAuthenticated, user } = state.auth;
  const { slug } = ownProps.params;
  const recipe = recipesBySlug[slug] || findRecipeBySlug(state, slug);
  const hasDetail = Boolean(recipesBySlug[slug]);

  return {
    hasDetail,
    isFetching,
    recipe,
    slug,
    isAuthenticated,
    user,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<StoreState, {}, AnyAction>): DispatchProps {
  return {
    fetchRecipe: (slug: string) => dispatch(fetchRecipe(slug)),
    deleteRecipe: (id: string) => dispatch(deleteRecipe(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeDetailPage);

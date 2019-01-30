import React, { Component } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from '@reach/router';

import { StoreState, RecipeDetail as RecipeDetailType, User } from '../types';
import { getImageUrl } from '../utils';
import { DangerAlert, WarningAlert } from '../components/elements';
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

type OwnProps = RouteComponentProps<Params>;

type StateProps = {
  hasDetail: boolean;
  isFetching: boolean;
  recipe?: RecipeDetailType;
  isAuthenticated: boolean;
  user?: User;
};

type DispatchProps = {
  deleteRecipe: (id: string) => Promise<RecipeDeleteAction>;
  fetchRecipe: (slug: string) => Promise<RecipeDetailAction>;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  showDeleteModal: boolean;
};

class RecipeDetailPage extends Component<Props, State> {
  state = {
    showDeleteModal: false,
  };

  componentDidMount() {
    if (navigator.onLine && this.props.slug) {
      this.props.fetchRecipe(this.props.slug);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (navigator.onLine && nextProps.slug && nextProps.slug !== this.props.slug) {
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
    if (!this.props.recipe) {
      return;
    }

    this.props.deleteRecipe(this.props.recipe._id).then(() => {
      this.props.navigate && this.props.navigate('/');
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
        {!hasDetail && isFetching && <Spinner />}
        {!hasDetail && !navigator.onLine && (
          <WarningAlert>
            <strong>Žádné připojení k internetu.</strong>
            <br />
            Recept se zobrazí v offline módu pouze po předchozím načtení.
          </WarningAlert>
        )}
        {hasDetail && (
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

function mapStateToProps(state: StoreState, ownProps: OwnProps): StateProps {
  const { isFetching, recipesBySlug } = state.recipeDetail;
  const { isAuthenticated, user } = state.auth;
  const { slug } = ownProps;
  const recipe = slug ? recipesBySlug[slug] || findRecipeBySlug(state, slug) : undefined;
  const hasDetail = Boolean(slug && recipesBySlug[slug]);

  return {
    hasDetail,
    isFetching,
    recipe,
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

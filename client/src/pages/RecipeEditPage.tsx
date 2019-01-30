import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { SortEnd } from 'react-sortable-hoc';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { RouteComponentProps } from '@reach/router';

import { RecipeDetail, Ingredient, StoreState, AutosuggestChangeEventHandler } from '../types';
import { getImageUrl } from '../utils';
import { DangerAlert } from '../components/elements';
import SpinnerIf from '../components/common/SpinnerIf';
import DocumentTitle from '../components/common/DocumentTitle';
import { fetchRecipe, RecipeDetailAction } from '../components/RecipeDetail/actions';
import {
  saveRecipe,
  fetchIngredientList,
  fetchSideDishList,
  RecipeEditAction,
  SaveRecipeParams,
} from '../components/RecipeEdit/actions';
import RecipeEdit from '../components/RecipeEdit/RecipeEdit';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

type Params = {
  slug?: string;
};

type OwnProps = RouteComponentProps<Params>;

type StateProps = {
  isNew: boolean;
  slug: string | undefined;
  recipe: RecipeDetail | undefined;
  isFetching: boolean;
  isSaving: boolean;
  ingredientOptions: string[];
  sideDishOptions: string[];
};

type DispatchProps = {
  fetchRecipe: (slug: string) => Promise<RecipeDetailAction>;
  saveRecipe: (
    id: string | undefined,
    recipe: SaveRecipeParams,
    hasNewImage: boolean,
  ) => Promise<RecipeEditAction>;
  fetchIngredientList: () => Promise<RecipeEditAction>;
  fetchSideDishList: () => Promise<RecipeEditAction>;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  changed: boolean;
  title?: string;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  directions?: string;
  ingredients: Ingredient[];
  newImage?: ArrayBuffer;
  isSavingImage: boolean;
};

class RecipeEditPage extends React.Component<Props, State> {
  saved = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      changed: false,
      isSavingImage: false,
      ingredients: [],
      ...(props.recipe && this.getRecipeState(props.recipe)),
    };
  }

  getRecipeState({
    title,
    preparationTime,
    servingCount,
    sideDish,
    directions,
    ingredients,
  }: RecipeDetail) {
    return {
      title,
      preparationTime,
      servingCount,
      sideDish,
      directions,
      ingredients,
      newImage: undefined,
      isSavingImage: false,
    };
  }

  componentDidMount() {
    const { fetchIngredientList, fetchSideDishList, slug, fetchRecipe } = this.props;

    // router.setRouteLeaveHook(route, () =>
    //   this.state.changed && !this.saved ? confirmMsg : undefined,
    // );

    fetchIngredientList();
    fetchSideDishList();

    if (slug) {
      fetchRecipe(slug);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.recipe === nextProps.recipe) {
      return;
    }

    if (nextProps.recipe) {
      this.setState(this.getRecipeState(nextProps.recipe));
      return;
    }

    this.setState({
      title: undefined,
      preparationTime: undefined,
      servingCount: undefined,
      sideDish: undefined,
      directions: undefined,
      ingredients: [],
      newImage: undefined,
      isSavingImage: false,
    });
  }

  componentDidUpdate() {
    if (!this.state.changed) {
      return;
    }

    window.onbeforeunload = e => {
      e.returnValue = confirmMsg;
      return confirmMsg;
    };
  }

  componentWillUnmount() {
    // tslint:disable-next-line no-any
    (window as any).onbeforeunload = undefined;
  }

  handleChange: AutosuggestChangeEventHandler = (event, selectEvent, targetName) => {
    const { name, value } = event.currentTarget;
    const key = targetName || name;
    const rawValue = selectEvent ? selectEvent.newValue : value;

    switch (key) {
      case 'title':
        this.setState({ title: rawValue });
        break;

      case 'sideDish':
        this.setState({ sideDish: rawValue });
        break;

      case 'directions':
        this.setState({ directions: rawValue });
        break;

      case 'preparationTime': {
        const parsed = Number.parseInt(rawValue, 10);
        this.setState({ preparationTime: Number.isNaN(parsed) ? undefined : parsed });
        break;
      }

      case 'servingCount': {
        const parsed = Number.parseInt(rawValue, 10);
        this.setState({ servingCount: Number.isNaN(parsed) ? undefined : parsed });
        break;
      }

      default:
        break;
    }

    this.setState({ changed: true });
  };

  handleAddIngredient = (name: string, amount?: number, amountUnit?: string) => {
    this.setState(state => ({
      changed: true,
      ingredients: [
        ...state.ingredients,
        {
          name,
          amount,
          amountUnit,
          isGroup: false,
        },
      ],
    }));
  };

  handleAddGroup = (group: string) => {
    this.setState(state => ({
      changed: true,
      ingredients: [
        ...state.ingredients,
        {
          name: group,
          isGroup: true,
        },
      ],
    }));
  };

  handleRemoveIngredient = (index: number) => {
    this.setState(({ ingredients }) => ({
      changed: true,
      ingredients: ingredients.filter((_, i) => i !== index),
    }));
  };

  handleSortIngredient = ({ oldIndex, newIndex }: SortEnd) => {
    this.setState(({ ingredients: oldIngredient }) => {
      const ingredients = [...oldIngredient];
      ingredients.splice(newIndex, 0, ingredients.splice(oldIndex, 1)[0]);

      return {
        changed: true,
        ingredients,
      };
    });
  };

  handleImageChange = (data: ArrayBuffer) => {
    this.setState({ changed: true, newImage: data });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      preparationTime,
      servingCount,
      sideDish,
      directions,
      ingredients,
      newImage,
    } = this.state;
    const { recipe, saveRecipe } = this.props;

    if (!title) {
      return;
    }

    saveRecipe(
      recipe && recipe._id,
      {
        title,
        preparationTime,
        servingCount,
        sideDish,
        directions,
        ingredients,
      },
      Boolean(newImage),
    ).then(action => this.handleSave(action));
  };

  handleSave(action: RecipeEditAction) {
    if (action.type === 'RECIPE.SAVE.SUCCESS' && action.payload && action.payload.recipe) {
      const { _id, slug } = action.payload.recipe;
      const { newImage } = this.state;

      if (!newImage) {
        this.completeSave(slug);
        return;
      }

      this.setState({ isSavingImage: true });

      axios
        .post(`/api/recipes/${_id}/image`, newImage, {
          headers: { 'Content-Type': 'application/octet-stream' },
        })
        .then(() => this.completeSave(slug))
        .catch(() => this.completeSave(slug));
    }
  }

  completeSave(slug: string) {
    notify.show('Recept úspěšně uložen', 'success');
    this.saved = true;
    this.props.navigate && this.props.navigate(`/recept/${slug}`);
  }

  render() {
    const {
      changed,
      title,
      preparationTime,
      servingCount,
      sideDish,
      directions,
      ingredients,
      isSavingImage,
    } = this.state;
    const {
      isNew,
      slug,
      recipe,
      isFetching,
      isSaving,
      ingredientOptions,
      sideDishOptions,
    } = this.props;

    if (!isNew && !recipe) {
      return (
        <SpinnerIf spinner={isFetching}>
          <DangerAlert>Recept nenalezen.</DangerAlert>
        </SpinnerIf>
      );
    }

    const imageUrl =
      slug && recipe && recipe.hasImage ? getImageUrl(slug, recipe.lastModifiedDate) : undefined;

    return (
      <>
        <DocumentTitle title={!title && isNew ? 'Nový recept' : title} />
        <RecipeEdit
          changed={changed}
          directions={directions}
          imageUrl={imageUrl}
          ingredientOptions={ingredientOptions}
          ingredients={ingredients}
          isNew={isNew}
          isSaving={isSaving || isSavingImage}
          onAddGroup={this.handleAddGroup}
          onAddIngredient={this.handleAddIngredient}
          onChange={this.handleChange}
          onImageChange={this.handleImageChange}
          onRemoveIngredient={this.handleRemoveIngredient}
          onSortIngredient={this.handleSortIngredient}
          onSubmit={this.handleSubmit}
          preparationTime={preparationTime}
          servingCount={servingCount}
          sideDish={sideDish}
          sideDishOptions={sideDishOptions}
          slug={slug}
          title={title}
        />
      </>
    );
  }
}

function mapStateToProps(state: StoreState, ownProps: OwnProps): StateProps {
  const { recipeDetail, recipeEdit } = state;
  const { isFetching, recipesBySlug } = recipeDetail;
  const {
    isSaving,
    ingredientList: { ingredients },
    sideDishList: { sideDishes },
  } = recipeEdit;
  const { slug } = ownProps;

  const recipe = slug ? recipesBySlug[slug] : undefined;

  return {
    ingredientOptions: ingredients,
    isFetching,
    isNew: !slug,
    isSaving,
    recipe,
    sideDishOptions: sideDishes,
    slug,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, {}, RecipeDetailAction>,
): DispatchProps {
  return {
    fetchRecipe: (slug: string) => dispatch(fetchRecipe(slug)),
    saveRecipe: (id: string | undefined, recipe: SaveRecipeParams, hasNewImage: boolean) =>
      dispatch(saveRecipe(id, recipe, hasNewImage)),
    fetchIngredientList: () => dispatch(fetchIngredientList()),
    fetchSideDishList: () => dispatch(fetchSideDishList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeEditPage);

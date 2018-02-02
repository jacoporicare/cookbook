import React, { FormEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { SortEnd } from 'react-sortable-hoc';

import { RecipeDetail, Ingredient, StoreState, AutosuggestChangeEventHandler } from '../types';
import DocumentTitle from '../components/DocumentTitle/DocumentTitle';
import { fetchRecipe, RecipeDetailAction } from '../components/RecipeDetail/actions';
import {
  saveRecipe,
  fetchIngredientList,
  fetchSideDishList,
  RecipeEditAction,
  SaveRecipeParams,
} from '../components/RecipeEdit/actions';
import RecipeEdit from '../components/RecipeEdit/RecipeEdit';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

interface Params {
  slug?: string;
}

interface Props extends RouteComponentProps<Params, {}> {
  isNew: boolean;
  slug: string | undefined;
  recipe: RecipeDetail | undefined;
  isFetching: boolean;
  isSaving: boolean;
  ingredientOptions: string[];
  sideDishOptions: string[];
  fetchRecipe: (slug: string) => Promise<RecipeDetailAction>;
  saveRecipe: (id: string | undefined, recipe: SaveRecipeParams) => Promise<RecipeEditAction>;
  fetchIngredientList: () => Promise<RecipeEditAction>;
  fetchSideDishList: () => Promise<RecipeEditAction>;
}

interface State {
  changed: boolean;
  title?: string;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  directions?: string;
  ingredients: Ingredient[];
}

class RecipeEditPage extends React.Component<Props, State> {
  saved = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      changed: false,
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
    };
  }

  componentDidMount() {
    const { router, route, fetchIngredientList, fetchSideDishList, slug, fetchRecipe } = this.props;

    router.setRouteLeaveHook(
      route,
      () => (this.state.changed && !this.saved ? confirmMsg : undefined),
    );

    fetchIngredientList();
    fetchSideDishList();

    if (slug) {
      fetchRecipe(slug);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.recipe !== nextProps.recipe) {
      if (nextProps.recipe) {
        this.setState({
          ...this.getRecipeState(nextProps.recipe),
        });
      } else {
        this.setState({
          title: undefined,
          preparationTime: undefined,
          servingCount: undefined,
          sideDish: undefined,
          directions: undefined,
          ingredients: [],
        });
      }
    }
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

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, preparationTime, servingCount, sideDish, directions, ingredients } = this.state;
    const { recipe, saveRecipe } = this.props;

    if (!title) {
      return;
    }

    saveRecipe(recipe && recipe._id, {
      title,
      preparationTime,
      servingCount,
      sideDish,
      directions,
      ingredients,
    }).then(action => this.handleSave(action));
  };

  handleSave(action: RecipeEditAction) {
    if (action.type === 'RECIPE.SAVE.SUCCESS' && action.payload && action.payload.recipe) {
      this.saved = true;
      this.props.router.push(`/recept/${action.payload.recipe.slug}`);
    }
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
        <div className="container">
          <SpinnerAlert level="danger" text="Recept nenalezen." spinner={isFetching} />
        </div>
      );
    }

    return (
      <>
        <DocumentTitle title={!title && isNew ? 'Nový recept' : title} />
        <div className="container">
          <RecipeEdit
            slug={slug}
            title={title}
            preparationTime={preparationTime}
            servingCount={servingCount}
            sideDish={sideDish}
            directions={directions}
            ingredients={ingredients}
            ingredientOptions={ingredientOptions}
            sideDishOptions={sideDishOptions}
            changed={changed}
            isNew={isNew}
            isSaving={isSaving}
            onChange={this.handleChange}
            onAddIngredient={this.handleAddIngredient}
            onAddGroup={this.handleAddGroup}
            onRemoveIngredient={this.handleRemoveIngredient}
            onSortIngredient={this.handleSortIngredient}
            onSubmit={this.handleSubmit}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: StoreState, ownProps: RouteComponentProps<Params, {}>) => {
  const { recipeDetail, recipeEdit } = state;
  const { isFetching, recipesBySlug } = recipeDetail;
  const { isSaving, ingredientList: { ingredients }, sideDishList: { sideDishes } } = recipeEdit;
  const { slug } = ownProps.params;

  const recipe = slug ? recipesBySlug[slug] : undefined;

  return {
    isNew: !slug,
    slug,
    recipe,
    isFetching,
    isSaving,
    ingredientOptions: ingredients,
    sideDishOptions: sideDishes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  fetchRecipe: (slug: string) => dispatch(fetchRecipe(slug)),
  saveRecipe: (id: string | undefined, recipe: RecipeDetail) => dispatch(saveRecipe(id, recipe)),
  fetchIngredientList: () => dispatch(fetchIngredientList()),
  fetchSideDishList: () => dispatch(fetchSideDishList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditPage);

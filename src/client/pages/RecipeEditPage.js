import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { parseValue } from '../utils';
import { loadRecipe, createRecipe, saveRecipe } from '../actions/recipeDetailsActions';
import { loadIngredients, loadSideDishes } from '../actions/autocompleteActions';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

class RecipeEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: { ...this.props.recipe },
      errors: {},
    };
  }

  componentDidMount() {
    this.props.loadIngredients();
    this.props.loadSideDishes();

    if (this.props.slug) {
      this.props.loadRecipe(this.props.slug);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { recipe: oldRecipe } = this.props;
    const { recipe: newRecipe } = nextProps;

    if (newRecipe.slug !== oldRecipe.slug) {
      this.setState({
        recipe: { ...newRecipe },
      });
    }
  }

  validate(recipe) {
    const { title } = recipe;
    const errors = {};

    if (!title || title.length < 1) {
      errors.title = true;
    }

    return errors;
  }

  handleChange = (event, selectEvent, targetName) => {
    const name = targetName || event.target.name;
    const value = selectEvent ? selectEvent.newValue : event.target.value;

    this.setState((prevState) => {
      const recipe = {
        ...prevState.recipe,
        [name]: parseValue(value, event.target.type),
      };
      const errors = this.validate(recipe);

      return { recipe, errors };
    });
  }

  handleAddIngredient = (event, ingredient) => {
    this.setState(({ recipe }) => ({
      recipe: {
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          ingredient,
        ],
      },
    }));
  }

  handleAddGroup = (event, group) => {
    this.setState(({ recipe }) => ({
      recipe: {
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          {
            name: group,
            isGroup: true,
          },
        ],
      },
    }));
  }

  handleRemoveIngredient = (event, index) => {
    event.preventDefault();

    this.setState(({ recipe }) => ({
      recipe: {
        ...recipe,
        ingredients: [
          ...recipe.ingredients.filter((e, i) => i !== index),
        ],
      },
    }));
  }

  handleSortIngredient = ({ oldIndex, newIndex }) => {
    this.setState(({ recipe }) => {
      const ingredients = [...recipe.ingredients];
      ingredients.splice(newIndex, 0, ingredients.splice(oldIndex, 1)[0]);

      return {
        recipe: {
          ...recipe,
          ingredients,
        },
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const promise = this.props.isNew ?
      this.props.createRecipe(this.state.recipe) :
      this.props.saveRecipe(this.state.recipe);

    promise.then(action => this.handleSave(action));
  }

  handleSave(action) {
    if (action.isSuccess) {
      toastr.success('Recept úspěšně uložen');
      this.props.router.push(`/recept/${action.response.slug}`);
    }
  }

  render() {
    const { recipe, errors } = this.state;
    const { isNew, isFetching, isSaving, ingredientOptions, sideDishOptions } = this.props;

    if (!isNew && !recipe.slug) {
      return (
        <div className="container">
          <SpinnerAlert level="danger" text="Recept nenalezen." spinner={isFetching} />
        </div>
      );
    }

    return (
      <div className="container">
        <RecipeForm
          recipe={recipe}
          ingredientOptions={ingredientOptions}
          sideDishOptions={sideDishOptions}
          errors={errors}
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
    );
  }
}

RecipeEditPage.propTypes = {
  isNew: PropTypes.bool,
  slug: PropTypes.string,
  recipe: PropTypes.object,
  isFetching: PropTypes.bool,
  isSaving: PropTypes.bool,
  ingredientOptions: PropTypes.array.isRequired,
  sideDishOptions: PropTypes.array.isRequired,
  loadRecipe: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  loadIngredients: PropTypes.func.isRequired,
  loadSideDishes: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { autocomplete } = state;
  const ingredientOptions = autocomplete.ingredients.items;
  const sideDishOptions = autocomplete.sideDishes.items;

  const { slug } = ownProps.params;

  if (!slug) {
    return {
      isNew: true,
      recipe: {
        ingredients: [],
      },
      ingredientOptions,
      sideDishOptions,
    };
  }

  const { recipeDetails } = state;
  const { isSaving } = recipeDetails;
  const {
    recipe = {},
    isFetching = true,
  } = recipeDetails[slug] || {};

  return {
    slug,
    recipe,
    isFetching,
    isSaving,
    ingredientOptions,
    sideDishOptions,
  };
}

export default connect(mapStateToProps, {
  loadRecipe,
  createRecipe,
  saveRecipe,
  loadIngredients,
  loadSideDishes,
})(RecipeEditPage);

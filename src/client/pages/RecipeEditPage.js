import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import toastr from 'toastr';
import { parseValue } from '../utils';
import { loadRecipe, createRecipe, saveRecipe } from '../actions/recipeDetailsActions';
import { loadIngredients, loadSideDishes } from '../actions/autocompleteActions';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

class RecipeEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: { ...this.props.recipe },
      errors: {},
      changed: false,
    };
  }

  componentWillMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      () => (this.state.changed ? confirmMsg : undefined),
    );
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

  checkChanged = (recipe) => {
    const changed = !_.isEqual(recipe, this.props.recipe);

    if (changed) {
      window.onbeforeunload = (e) => {
        e.returnValue = confirmMsg; // eslint-disable-line no-param-reassign
        return confirmMsg;
      };
    } else {
      window.onbeforeunload = undefined;
    }

    return changed;
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
    const type = event.target.type;

    this.setState(({ recipe }) => {
      const newRecipe = {
        ...recipe,
        [name]: parseValue(value, type),
      };

      return {
        recipe: newRecipe,
        errors: this.validate(newRecipe),
        changed: this.checkChanged(newRecipe),
      };
    });
  }

  handleAddIngredient = (event, ingredient) => {
    this.setState(({ recipe }) => {
      const newRecipe = {
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          ingredient,
        ],
      };

      return {
        recipe: newRecipe,
        changed: this.checkChanged(newRecipe),
      };
    });
  }

  handleAddGroup = (event, group) => {
    this.setState(({ recipe }) => {
      const newRecipe = {
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          {
            name: group,
            isGroup: true,
          },
        ],
      };

      return {
        recipe: newRecipe,
        changed: this.checkChanged(newRecipe),
      };
    });
  }

  handleRemoveIngredient = (event, index) => {
    event.preventDefault();

    this.setState(({ recipe }) => {
      const newRecipe = {
        ...recipe,
        ingredients: [
          ...recipe.ingredients.filter((e, i) => i !== index),
        ],
      };

      return {
        recipe: newRecipe,
        changed: this.checkChanged(newRecipe),
      };
    });
  }

  handleSortIngredient = ({ oldIndex, newIndex }) => {
    this.setState(({ recipe }) => {
      const ingredients = [...recipe.ingredients];
      ingredients.splice(newIndex, 0, ingredients.splice(oldIndex, 1)[0]);

      const newRecipe = {
        ...recipe,
        ingredients,
      };

      return {
        recipe: newRecipe,
        changed: this.checkChanged(newRecipe),
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
    const { recipe, errors, changed } = this.state;
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
  route: PropTypes.object.isRequired,
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

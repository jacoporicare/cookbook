import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loadRecipe, saveRecipe } from '../actions/recipeDetailsActions';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import Spinner from '../components/Spinner/Spinner';

class RecipeEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      recipe: { ...this.props.recipe },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadRecipe(this.props.slug);
  }

  componentWillReceiveProps(nextProps) {
    const { recipe: oldRecipe } = this.props;
    const { recipe: newRecipe } = nextProps;

    if (newRecipe.slug !== oldRecipe.slug) {
      this.setState({
        recipe: { ...newRecipe }
      });
    }
  }

  parseValue(value, type) {
    let parsedValue;

    switch (type) {
      case 'number':
        parsedValue = Number.parseInt(value);
        return !Number.isNaN(parsedValue) ? parsedValue : '';

      default:
        return value;
    }
  }

  validate(recipe) {
    const { title } = recipe;
    const errors = {};

    if (title.length < 1) {
      errors.title = true;
    }

    return errors;
  }

  handleChange(event) {
    const { name, value } = event.target;
    const recipe = {
      ...this.state.recipe,
      [name]: this.parseValue(value, event.target.type)
    };
    const errors = this.validate(recipe);

    this.setState({ recipe, errors });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveRecipe(this.state.recipe)
      .then(action => this.handleSave(action));
  }

  handleSave(action) {
    if (action.isSuccess) {
      toastr.success('Recept úspěšně uložen');
      this.context.router.push(`/recept/${action.response.slug}`);
    }
  }

  render() {
    const { recipe, errors } = this.state;
    const { isFetching, isSaving } = this.props;

    if (!recipe.slug) {
      return (
        <div className="container">
          {isFetching
            ? <Spinner />
            : <div className="alert alert-danger">Recept nenalezen.</div>
          }
        </div>
      );
    }

    return (
      <div className="container">
        <RecipeForm
          recipe={recipe}
          errors={errors}
          isSaving={isSaving}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

RecipeEditPage.propTypes = {
  slug: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  loadRecipe: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired
};

RecipeEditPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps.params;
  const { recipeDetails } = state;
  const { isSaving } = recipeDetails;
  const {
    recipe = {},
    isFetching = true
  } = recipeDetails[slug] || {};

  return {
    slug,
    recipe,
    isFetching,
    isSaving
  };
}

export default connect(mapStateToProps, {
  loadRecipe,
  saveRecipe
})(RecipeEditPage);

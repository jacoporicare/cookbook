import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../actions/recipeDetailsActions';
import RecipeForm from '../components/RecipeForm/RecipeForm';
import Spinner from '../components/Spinner/Spinner';

class RecipeEditPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: { ...this.props.recipe },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { recipe, errors } = this.state;
    const { isFetching } = this.props;

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
        <RecipeForm recipe={recipe} onChange={this.handleChange} errors={errors} />
      </div>
    );
  }
}

RecipeEditPage.propTypes = {
  slug: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadRecipe: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { recipeDetails } = state;
  const { slug } = ownProps.params;
  const {
    isFetching = true,
    recipe = {}
  } = recipeDetails[slug] || {};

  return {
    slug,
    isFetching,
    recipe
  };
}

export default connect(mapStateToProps, {
  loadRecipe
})(RecipeEditPage);

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
    switch (type) {
      case 'number':
        return parseInt(value);

      default:
        return value;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { recipe } = this.state;

    this.setState({
      recipe: {
        ...recipe,
        [name]: this.parseValue(value, event.target.type)
      }
    });
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

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesIfNeeded } from '../actions/recipesActions';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';

class RecipeDetailPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipesIfNeeded());
  }

  render() {
    const { recipe, isFetching } = this.props;
    const exists = !!recipe;

    return (
      <div className="container">
        {!exists
          ? (isFetching ? <h2>Nahrávání...</h2> : <div className="alert alert-danger">Recept nenalezen.</div>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <RecipeDetail recipe={recipe} />
            </div>
        }
      </div>
    );
  }
}

RecipeDetailPage.propTypes = {
  recipe: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { recipes } = state;
  const { slug } = ownProps.params;

  const recipe = recipes.items.find(r => r.slug == slug);

  return {
    recipe,
    isFetching: recipes.isFetching
  };
}

export default connect(mapStateToProps)(RecipeDetailPage);

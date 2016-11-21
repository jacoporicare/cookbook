import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesIfNeeded } from '../actions/recipesActions';
import RecipeList from '../components/RecipeList/RecipeList';

class RecipeListPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipesIfNeeded());
  }

  render() {
    const { recipes, isFetching } = this.props;
    const isEmpty = recipes.length === 0;

    return (
      <div className="container">
        {isEmpty
          ? (isFetching ? <h2>Nahrávání...</h2> : <div className="alert alert-info">Zatím zde není žádný recept.</div>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <RecipeList recipes={recipes} />
            </div>
        }
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { recipes } = state;

  return {
    recipes: recipes.items,
    isFetching: recipes.isFetching
  };
}

export default connect(mapStateToProps)(RecipeListPage);

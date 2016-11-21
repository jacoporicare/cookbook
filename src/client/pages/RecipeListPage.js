import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRecipes } from '../actions/recipesActions';
import RecipeList from '../components/RecipeList/RecipeList';

class RecipeListPage extends React.Component {
  componentDidMount() {
    this.props.loadRecipes();
  }

  render() {
    const { recipes, isFetching } = this.props;
    const isEmpty = recipes.length === 0;

    return (
      <div className="container">
        {isEmpty
          ? (isFetching ? <h2>Nahrávání...</h2> : <div className="alert alert-info">Zatím zde není žádný recept.</div>)
          : <RecipeList recipes={recipes} />
        }
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadRecipes: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { recipes } = state;

  return {
    recipes: recipes.items,
    isFetching: recipes.isFetching
  };
}

export default connect(mapStateToProps, {
  loadRecipes
})(RecipeListPage);

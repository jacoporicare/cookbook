import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRecipes } from '../actions/recipesActions';
import RecipeList from '../components/RecipeList/RecipeList';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

class RecipeListPage extends React.Component {
  componentDidMount() {
    this.props.loadRecipes();
  }

  render() {
    const { recipes, isFetching } = this.props;
    const isEmpty = recipes.length === 0;

    return (
      <div className="container">
        <h1 className="page-header clearfix">Recepty</h1>
        {isEmpty
          ? <SpinnerAlert level="info" text="Zatím zde není žádný recept." spinner={isFetching} />
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

const mapStateToProps = state => ({
  recipes: state.recipes.items,
  isFetching: state.recipes.isFetching
});

export default connect(mapStateToProps, {
  loadRecipes
})(RecipeListPage);

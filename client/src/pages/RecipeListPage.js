import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import removeDiacritics from 'javascript-remove-diacritics';
import { fetchRecipeList } from '../components/RecipeList/actions';
import RecipeList from '../components/RecipeList/RecipeList';
import SearchBar from '../components/SearchBar/SearchBar';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

class RecipeListPage extends Component {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchRecipeList: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: null,
      recipes: props.recipes,
    };
  }

  componentDidMount() {
    this.props.fetchRecipeList();
  }

  componentWillReceiveProps({ recipes }) {
    if (recipes !== this.props.recipes) {
      const { searchText } = this.state;
      this.setState({
        recipes: this.getFilteredRecipes(recipes, searchText),
      });
    }
  }

  getFilteredRecipes(recipes, searchText) {
    if (!searchText) {
      return recipes;
    }

    return recipes.filter(r =>
      removeDiacritics
        .replace(r.title)
        .toLowerCase()
        .includes(removeDiacritics.replace(searchText)),
    );
  }

  handleSearchChange = searchText => {
    const { recipes } = this.props;
    this.setState({
      searchText,
      recipes: this.getFilteredRecipes(recipes, searchText),
    });
  };

  render() {
    const { isFetching } = this.props;
    const { recipes, searchText } = this.state;
    const isEmpty = recipes.length === 0;

    return (
      <div className="container">
        <h1 className="page-header clearfix">
          <div className="row">
            <div className="col-md-6">Recepty</div>
            <div className="col-md-6 text-right">
              <Link to="/novy-recept" className="btn btn-primary">
                <i className="fa fa-plus-circle" /> Nový recept
              </Link>
            </div>
          </div>
        </h1>
        <SearchBar onChange={this.handleSearchChange} />
        {isEmpty
          ? <SpinnerAlert
              level="info"
              spinner={isFetching}
              text={
                searchText
                  ? 'Nenalezen žádný recept.'
                  : 'Zatím zde není žádný recept.'
              }
            />
          : <RecipeList recipes={recipes} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { recipes, isFetching } = state.recipeList;

  return {
    recipes,
    isFetching,
  };
};

const mapDispatchToProps = {
  fetchRecipeList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import matchSorter from 'match-sorter';

import { StoreState, Recipe } from '../types';
import RecipeList from '../components/RecipeList/RecipeList';
import SearchBar from '../components/SearchBar/SearchBar';
import SpinnerAlert from '../components/SpinnerAlert/SpinnerAlert';

interface Props {
  recipes: Recipe[];
  isFetching: boolean;
  isAuthenticated: boolean;
}

interface State {
  searchText?: string;
  recipes: Recipe[];
}

class RecipeListPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      recipes: props.recipes,
    };
  }

  componentWillReceiveProps({ recipes }: Props) {
    if (recipes !== this.props.recipes) {
      const { searchText } = this.state;
      this.setState({
        recipes: this.getFilteredRecipes(recipes, searchText),
      });
    }
  }

  getFilteredRecipes(recipes: Recipe[], searchText?: string) {
    if (!searchText) {
      return recipes;
    }

    return matchSorter(recipes, searchText, { keys: ['title'] });
  }

  handleSearchChange = (searchText?: string) => {
    const { recipes } = this.props;
    this.setState({
      searchText,
      recipes: this.getFilteredRecipes(recipes, searchText),
    });
  };

  render() {
    const { isFetching, isAuthenticated } = this.props;
    const { recipes, searchText } = this.state;
    const isEmpty = recipes.length === 0;

    return (
      <div className="container">
        <h1 className="page-header clearfix">
          <div className="row">
            <div className="col-md-6">Recepty</div>
            {isAuthenticated && (
              <div className="col-md-6 text-right">
                <Link to="/novy-recept" className="btn btn-primary">
                  <i className="fa fa-plus-circle" /> Nový recept
                </Link>
              </div>
            )}
          </div>
        </h1>
        <SearchBar onChange={this.handleSearchChange} />
        {isEmpty ? (
          <SpinnerAlert
            level="info"
            spinner={isFetching}
            text={searchText ? 'Nenalezen žádný recept.' : 'Zatím zde není žádný recept.'}
          />
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  const { recipes, isFetching } = state.recipeList;
  const { isAuthenticated } = state.auth;

  return {
    recipes,
    isFetching,
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(RecipeListPage);

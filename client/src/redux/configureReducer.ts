import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { StoreState } from '../types';
import auth from '../components/Auth/reducer';
import navbar from '../components/Navbar/reducer';
import recipeList from '../components/RecipeList/reducer';
import recipeDetail from '../components/RecipeDetail/reducer';
import recipeEdit from '../components/RecipeEdit/reducer';

const configureReducer = () =>
  combineReducers<StoreState>({
    routing: routerReducer,
    auth,
    navbar,
    recipeList,
    recipeDetail,
    recipeEdit,
  });

export default configureReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorMessage from './errorMessageReducer';
import recipes from './recipesReducer';
import recipeDetails from './recipeDetailsReducer';

export default combineReducers({
  routing: routerReducer,
  errorMessage,
  recipes,
  recipeDetails
});

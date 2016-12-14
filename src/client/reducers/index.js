import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorMessage from './errorMessageReducer';
import auth from './authReducer';
import recipes from './recipesReducer';
import recipeDetails from './recipeDetailsReducer';

export default combineReducers({
  routing: routerReducer,
  errorMessage,
  auth,
  recipes,
  recipeDetails
});

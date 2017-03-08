import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorMessage from './errorMessageReducer';
import auth from './authReducer';
import user from './userReducer';
import recipes from './recipesReducer';
import recipeDetails from './recipeDetailsReducer';
import autocomplete from './autocompleteReducer';

export default combineReducers({
  routing: routerReducer,
  errorMessage,
  auth,
  user,
  recipes,
  recipeDetails,
  autocomplete,
});

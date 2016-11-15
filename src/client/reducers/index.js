import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recipes from "./recipesReducer";

export default combineReducers({
  routing: routerReducer,
  recipes
});

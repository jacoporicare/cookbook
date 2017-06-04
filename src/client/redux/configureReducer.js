import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorMessage from '../components/ErrorMessage/reducer';
import auth from '../components/Auth/reducer';
import navbar from '../components/Navbar/reducer';
import recipeList from '../components/RecipeList/reducer';
import recipeDetail from '../components/RecipeDetail/reducer';
import recipeEdit from '../components/RecipeEdit/reducer';

const configureReducer = () =>
  combineReducers({
    routing: routerReducer,
    errorMessage,
    auth,
    navbar,
    recipeList,
    recipeDetail,
    recipeEdit,
  });

export default configureReducer;

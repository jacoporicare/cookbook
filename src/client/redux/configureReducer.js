import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import errorMessage from '../reducers/errorMessageReducer';
import auth from '../reducers/authReducer';
import user from '../reducers/userReducer';
import recipeList from '../components/RecipeList/reducer';
import recipeDetail from '../components/RecipeDetail/reducer';
import recipeEdit from '../components/RecipeEdit/reducer';
import autocomplete from '../reducers/autocompleteReducer';

const configureReducer = () =>
  combineReducers({
    routing: routerReducer,
    errorMessage,
    auth,
    user,
    recipeList,
    recipeDetail,
    recipeEdit,
    autocomplete,
  });

export default configureReducer;

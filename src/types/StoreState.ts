import { AuthState } from '../components/Auth/reducer';
import { RecipeListState } from '../components/RecipeList/reducer';
import { RecipeDetailState } from '../components/RecipeDetail/reducer';
import { RecipeEditState } from '../components/RecipeEdit/reducer';

export type StoreState = {
  auth: AuthState;
  recipeList: RecipeListState;
  recipeDetail: RecipeDetailState;
  recipeEdit: RecipeEditState;
};

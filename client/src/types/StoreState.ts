import { AuthState } from '../components/Auth/reducer';
import { NavbarState } from '../components/Navbar/reducer';
import { RecipeListState } from '../components/RecipeList/reducer';
import { RecipeDetailState } from '../components/RecipeDetail/reducer';
import { RecipeEditState } from '../components/RecipeEdit/reducer';

export default interface StoreState {
  auth: AuthState;
  navbar: NavbarState;
  recipeList: RecipeListState;
  recipeDetail: RecipeDetailState;
  recipeEdit: RecipeEditState;
};

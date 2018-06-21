import { Recipe, StoreState } from '../../types';
import { RecipeListAction } from './actions';
import { RecipeEditAction } from '../RecipeEdit/actions';
import { RecipeDeleteAction } from '../RecipeDeleteModal/actions';

export type RecipeListState = {
  isFetching: boolean;
  recipes: Recipe[];
};

const initialState: RecipeListState = {
  isFetching: false,
  recipes: [],
};

function recipeListReducer(
  state: RecipeListState = initialState,
  action: RecipeListAction | RecipeEditAction | RecipeDeleteAction,
): RecipeListState {
  switch (action.type) {
    case 'RECIPE_LIST.FETCH.REQUEST':
      return {
        ...state,
        isFetching: true,
      };

    case 'RECIPE_LIST.FETCH.SUCCESS': {
      const { recipes } = action.payload;

      return {
        ...state,
        isFetching: false,
        recipes: recipes.sort(sortByTitle),
      };
    }

    case 'RECIPE_LIST.FETCH.FAILURE':
      return {
        ...state,
        isFetching: false,
      };

    case 'RECIPE.SAVE.SUCCESS': {
      const { recipe } = action.payload;
      const recipes = [...state.recipes.filter(r => r._id !== recipe._id), recipe];

      return {
        ...state,
        recipes: recipes.sort(sortByTitle),
      };
    }

    case 'RECIPE.DELETE.SUCCESS': {
      const { id } = action.payload;

      return {
        ...state,
        recipes: state.recipes.filter(r => r._id !== id),
      };
    }

    default:
      return state;
  }
}

export default recipeListReducer;

export function findRecipeBySlug(state: StoreState, slug: string): Recipe | undefined {
  return state.recipeList.recipes.find(r => r.slug === slug);
}

function sortByTitle(a: Recipe, b: Recipe) {
  return a.title.localeCompare(b.title);
}

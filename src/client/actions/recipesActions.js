import { RECEIVE_RECIPES } from '../constants/actionTypes';

function receiveRecipes(recipes) {
  return {
    type: RECEIVE_RECIPES,
    recipes: recipes
  };
}

export function fetchRecipes() {
  return (dispatch) => {
    setTimeout(() => {
      const recipes = [];
      for (let i = 1; i < 100; i++) {
        recipes.push({ id: i, title: `Recept ${i}`, sideDish: 'brambory', preparationTime: 30 });
      }

      dispatch(receiveRecipes(recipes));
    }, 1000);
  };
}

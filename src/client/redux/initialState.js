export default {
  errorMessage: null,
  auth: {
    isSubmitting: false,
    isAuthenticated: false,
    token: null,
  },
  user: {
    currentUser: {
      isFetching: false,
    },
  },
  recipeList: {
    isFetching: false,
    recipes: [],
  },
  recipeDetail: {
    isFetching: false,
    recipesBySlug: {},
  },
  recipeEdit: {
    isSaving: false,
    ingredientList: {
      isFetching: false,
      ingredients: [],
    },
    sideDishList: {
      isFetching: false,
      sideDishes: [],
    },
  },
};

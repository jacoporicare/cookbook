export default {
  errorMessage: null,
  auth: {
    isSubmitting: false,
    isAuthenticated: false,
    token: null,
  },
  navbar: {
    isFetchingUser: false,
    user: null,
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

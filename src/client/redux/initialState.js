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
  },
  autocomplete: {
    ingredients: {
      isFetching: false,
      items: [],
    },
    sideDishes: {
      isFetching: false,
      items: [],
    },
  },
};

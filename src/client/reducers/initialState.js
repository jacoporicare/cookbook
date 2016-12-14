export default {
  errorMessage: null,
  auth: {
    isFetching: false,
    isAuthenticated: false,
    token: null,
    user: {
      isFetching: false
    }
  },
  recipes: {
    items: [],
    isFetching: false
  },
  recipeDetails: {
    isSaving: false
  }
};

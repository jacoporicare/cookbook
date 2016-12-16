export default {
  errorMessage: null,
  auth: {
    isSubmitting: false,
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

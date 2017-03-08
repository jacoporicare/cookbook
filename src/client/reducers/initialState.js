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
  recipes: {
    items: [],
    isFetching: false,
  },
  recipeDetails: {
    isSaving: false,
  },
  autocomplete: {
    ingredients: {
      items: [],
      isFetching: false,
    },
    sideDishes: {
      items: [],
      isFetching: false,
    },
  },
};

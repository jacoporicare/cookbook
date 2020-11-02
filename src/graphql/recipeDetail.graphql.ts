import gql from 'graphql-tag';

import recipeDetailFragment from './recipeDetailFragment.graphql';
import userFragment from './userFragment.graphql';

export default gql`
  query RecipeDetail($slug: String!) {
    recipe(slug: $slug) {
      ...recipeDetail
    }

    me {
      ...user
    }
  }

  ${recipeDetailFragment}
  ${userFragment}
`;
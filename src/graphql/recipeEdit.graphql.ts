import gql from 'graphql-tag';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  query RecipeEdit($slug: String!) {
    recipe(slug: $slug) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

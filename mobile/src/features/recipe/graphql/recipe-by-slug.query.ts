import { gql } from '@apollo/client';

import recipeDetailFragment from './recipe-detail.fragment';

export default gql`
  query RecipeBySlug($slug: String!) {
    recipe(slug: $slug) {
      ...recipeDetail
    }
  }
  ${recipeDetailFragment}
`;

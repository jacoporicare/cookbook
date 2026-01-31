import { gql } from '@apollo/client';

import recipeDetailFragment from './recipe-detail.fragment';

export default gql`
  query RecipeList {
    recipes {
      ...recipeDetail
    }
  }
  ${recipeDetailFragment}
`;

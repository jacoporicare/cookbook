import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  mutation ImportRecipe($url: String!) {
    importRecipe(url: $url) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

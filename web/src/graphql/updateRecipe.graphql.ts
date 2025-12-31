import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!, $imageId: ID) {
    updateRecipe(id: $id, recipe: $recipe, imageId: $imageId) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

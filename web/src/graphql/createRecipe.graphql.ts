import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  mutation CreateRecipe($recipe: RecipeInput!, $imageId: ID) {
    createRecipe(recipe: $recipe, imageId: $imageId) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

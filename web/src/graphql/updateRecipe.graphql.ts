import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!, $image: Upload) {
    updateRecipe(id: $id, recipe: $recipe, image: $image) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

import { gql } from '@apollo/client';

import recipeDetailFragment from './recipeDetailFragment.graphql';

export default gql`
  mutation CreateRecipe($recipe: RecipeInput!, $image: Upload) {
    createRecipe(recipe: $recipe, image: $image) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

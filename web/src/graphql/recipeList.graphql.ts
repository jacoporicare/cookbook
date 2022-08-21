import { gql } from '@apollo/client';

import recipeBaseFragment from './recipeBaseFragment.graphql';

export default gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
    tags
  }

  ${recipeBaseFragment}
`;

import { gql } from '@apollo/client';

import recipeBaseFragment from './recipeBaseFragment.graphql';
import userFragment from './userFragment.graphql';

export default gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
    tags
    me {
      ...user
    }
  }

  ${recipeBaseFragment}
  ${userFragment}
`;

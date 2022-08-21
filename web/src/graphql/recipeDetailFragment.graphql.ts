import { gql } from '@apollo/client';

import recipeBaseFragment from './recipeBaseFragment.graphql';
import userFragment from './userFragment.graphql';

export default gql`
  fragment recipeDetail on Recipe {
    ...recipeBase
    directions
    servingCount
    ingredients {
      id
      name
      amount
      amountUnit
      isGroup
    }
    user {
      ...user
    }
  }

  ${recipeBaseFragment}
  ${userFragment}
`;

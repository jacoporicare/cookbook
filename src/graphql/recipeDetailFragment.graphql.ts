import { gql } from '@apollo/client';

import recipeBaseFragment from './recipeBaseFragment.graphql';

export default gql`
  fragment recipeDetail on Recipe {
    ...recipeBase
    directions
    servingCount
    ingredients {
      _id
      name
      amount
      amountUnit
      isGroup
    }
  }

  ${recipeBaseFragment}
`;

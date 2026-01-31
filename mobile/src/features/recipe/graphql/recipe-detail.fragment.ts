import { gql } from '@apollo/client';

import recipeBaseFragment from './recipe-base.fragment';

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
    sousVideOptions {
      id
      temperature
      time
      label
    }
    user {
      id
      displayName
    }
  }
  ${recipeBaseFragment}
`;

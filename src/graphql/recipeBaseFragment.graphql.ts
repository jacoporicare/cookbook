import { gql } from '@apollo/client';

import userFragment from './userFragment.graphql';

export default gql`
  fragment recipeBase on Recipe {
    _id
    slug
    title
    sideDish
    tags
    preparationTime
    image {
      fullUrl
      thumbUrl
      thumbWebPUrl
    }
    lastModifiedDate
    user {
      ...user
    }
  }

  ${userFragment}
`;

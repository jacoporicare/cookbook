import { gql } from '@apollo/client';

export default gql`
  fragment recipeBase on Recipe {
    id
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
  }
`;

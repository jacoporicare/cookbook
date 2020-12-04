import gql from 'graphql-tag';

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
  }
`;

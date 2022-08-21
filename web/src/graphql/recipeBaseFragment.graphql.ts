import { gql } from '@apollo/client';

export default gql`
  fragment recipeBase on Recipe {
    id
    slug
    title
    sideDish
    tags
    preparationTime
    imageUrl
    imageWebPUrl: imageUrl(format: WEBP)
    imageThumbUrl: imageUrl(size: { width: 800, height: 800 })
    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)
    lastModifiedDate
  }
`;

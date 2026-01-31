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
    imageThumbUrl: imageUrl(size: { width: 480, height: 480 })
    listImageUrl: imageUrl(size: { width: 240, height: 180 })
  }
`;

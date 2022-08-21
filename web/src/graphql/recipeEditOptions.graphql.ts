import { gql } from '@apollo/client';

export default gql`
  query RecipeEditOptions {
    ingredients
    sideDishes
    tags
  }
`;

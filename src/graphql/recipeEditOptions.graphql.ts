import gql from 'graphql-tag';

export default gql`
  query RecipeEditOptions {
    ingredients
    sideDishes
    tags
  }
`;

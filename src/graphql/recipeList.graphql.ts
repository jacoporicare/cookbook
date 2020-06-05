import gql from 'graphql-tag';

import recipeBaseFragment from './recipeBaseFragment.graphql';

export default gql`
  query RecipeList {
    recipes {
      ...recipeBase
    }
    tags
  }

  ${recipeBaseFragment}
`;

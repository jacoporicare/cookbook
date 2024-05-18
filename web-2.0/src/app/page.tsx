import { graphql } from '@/gql';

const recipeListQueryDocument = graphql(`
  query RecipeList {
    recipes {
      ...RecipeItem
    }
    tags
  }
`);

export default function Home() {
  return <main></main>;
}

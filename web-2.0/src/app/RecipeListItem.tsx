import { FragmentType, graphql, useFragment } from '@/gql';

export const RecipeFragment = graphql(`
  fragment RecipeItem on Recipe {
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
`);

type Props = {
  recipe: FragmentType<typeof RecipeFragment>;
};

export default function RecipeListItem(props: Props) {
  const recipe = useFragment(RecipeFragment, props.recipe);

  return <h2>{recipe.title}</h2>;
}

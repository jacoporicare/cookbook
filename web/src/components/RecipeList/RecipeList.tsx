import { RecipeBaseFragment } from '../../generated/graphql';
import { RecipeListItem } from './RecipeListItem';

type Props = {
  recipes: RecipeBaseFragment[];
};

export function RecipeList({ recipes }: Props) {
  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
      `}
    >
      {recipes.map((recipe) => (
        <article key={recipe.slug}>
          <RecipeListItem recipe={recipe} />
        </article>
      ))}
    </div>
  );
}

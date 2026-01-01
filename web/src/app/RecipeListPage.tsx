import slug from 'slug';

import { Layout } from '@/components/Layout';
import {
  FilterContent,
  FilterToggleButton,
  RecipeFilterWrapper,
} from '@/components/RecipeList/RecipeFilterWrapper';
import { RecipeList } from '@/components/RecipeList/RecipeList';
import { RecipeListFab } from '@/components/RecipeList/RecipeListFab';
import { TagFilter } from '@/components/RecipeList/TagFilter';
import { PageHeading } from '@/components/common/PageHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RecipeListQuery } from '@/generated/graphql';
import { User } from '@/types/user';

type Props = {
  recipes: RecipeListQuery['recipes'];
  allRecipes: RecipeListQuery['recipes'];
  tags: RecipeListQuery['tags'];
  user: User;
  selectedTag: string | null;
};

export function RecipeListPage({
  recipes,
  allRecipes,
  tags,
  user,
  selectedTag,
}: Props) {
  const tagOptions = tags.map((t) => ({
    value: slug(t),
    label: t,
  }));

  const isEmpty = recipes.length === 0;

  return (
    <Layout recipes={allRecipes} user={user}>
      <RecipeFilterWrapper
        initialVisible={!!selectedTag}
        hasSelectedTag={!!selectedTag}
      >
        <section>
          <PageHeading buttons={<FilterToggleButton />}>
            Recepty{' '}
            <span className="text-muted-foreground">{recipes.length}</span>
          </PageHeading>
          <FilterContent>
            <TagFilter tagOptions={tagOptions} selectedTag={selectedTag} />
          </FilterContent>
          {isEmpty ? (
            <Alert>
              <AlertDescription>Žádné recepty.</AlertDescription>
            </Alert>
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </section>
      </RecipeFilterWrapper>
      {user && <RecipeListFab />}
    </Layout>
  );
}

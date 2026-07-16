import slug from 'slug';

import {
  FilterContent,
  FilterToggleButton,
  RecipeFilterWrapper,
} from '@/components/RecipeList/RecipeFilterWrapper';
import { RecipeList } from '@/components/RecipeList/RecipeList';
import { TagFilter } from '@/components/RecipeList/TagFilter';
import { PageHeading } from '@/components/common/PageHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RecipeListQuery } from '@/generated/graphql';

type Props = {
  recipes: RecipeListQuery['recipes'];
  tags: RecipeListQuery['tags'];
  selectedTag: string | null;
};

export function RecipeListPage({ recipes, tags, selectedTag }: Props) {
  const tagOptions = tags.map((t) => ({
    value: slug(t),
    label: t,
  }));

  const isEmpty = recipes.length === 0;

  return (
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
  );
}

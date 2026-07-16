import { PageHeading } from '@/components/common/PageHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PLACEHOLDER_COUNT = 12;

/**
 * Loading placeholder shown while the recipe list streams in (the list is
 * behind a Suspense boundary because it depends on the `stitek` search param).
 * Mirrors RecipeListPage's layout — heading (no count) + RecipeList's card grid
 * — so navigating back to the home page shows a skeleton instead of a blank
 * gap.
 */
export function RecipeListSkeleton() {
  return (
    <section>
      <PageHeading>Recepty</PageHeading>
      <div
        className={`
          grid grid-cols-1 gap-4
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-6
        `}
      >
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <Card key={i} className="gap-0 overflow-hidden py-0">
            <Skeleton className="w-full rounded-none pt-[75%]" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

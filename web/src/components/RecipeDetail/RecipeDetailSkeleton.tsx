import { PageHeading } from '@/components/common/PageHeading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading placeholder for a recipe detail page. Mirrors RecipeDetailPage's
 * layout (title, meta row, ingredients card, directions card, image + author
 * column) so navigating list → detail shows a skeleton instead of a blank gap
 * while the content streams / the transition settles.
 */
export function RecipeDetailSkeleton() {
  return (
    <article>
      <PageHeading>
        <Skeleton className="h-9 w-64 max-w-full" />
      </PageHeading>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <div
        className={`
          grid grid-cols-1 gap-8
          md:grid-cols-12
        `}
      >
        <div
          className={`
            flex flex-col gap-6
            md:col-span-4
            lg:col-span-3
          `}
        >
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>

        <div
          className={`
            md:col-span-6
            lg:col-span-7
          `}
        >
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {Array.from({ length: 8 }, (_, i) => (
                <Skeleton
                  key={i}
                  className={i % 3 === 2 ? 'h-4 w-2/3' : 'h-4 w-full'}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="overflow-hidden p-0">
            <Skeleton className="w-full rounded-none pt-[75%]" />
          </Card>
          <div className="my-4 flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </article>
  );
}

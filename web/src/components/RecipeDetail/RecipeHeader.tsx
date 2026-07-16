import Link from 'next/link';
import { ReactNode } from 'react';
import toSlug from 'slug';

import { Badge } from '@/components/ui/badge';
import { sortLocaleInsensitive } from '@/lib/utils';

import { RecipeInfo } from '../RecipeInfo/RecipeInfo';
import { PageHeading } from '../common/PageHeading';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  tags?: string[];
  title: string;
  actions?: ReactNode;
};

export function RecipeHeader({
  preparationTime,
  sideDish,
  tags,
  title,
  actions,
}: Props) {
  return (
    <>
      <PageHeading buttons={actions}>{title}</PageHeading>

      {Boolean(preparationTime || sideDish || tags?.length) && (
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              {Boolean(preparationTime || sideDish) && (
                <RecipeInfo
                  preparationTime={preparationTime}
                  sideDish={sideDish}
                />
              )}
            </div>
            {!!tags?.length && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Štítky</span>
                {sortLocaleInsensitive(tags).map((tag) => (
                  <Link key={tag} href={`/?stitek=${toSlug(tag)}`}>
                    <Badge className="cursor-pointer">{tag}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

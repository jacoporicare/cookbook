import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toSlug from 'slug';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { RecipeInfo } from '../RecipeInfo/RecipeInfo';
import { PageHeading } from '../common/PageHeading';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  tags?: string[];
  title: string;
  isAuthor?: boolean;
  onDeleteShow: () => void;
};

export function RecipeHeader({
  preparationTime,
  sideDish,
  slug,
  tags,
  title,
  isAuthor,
  onDeleteShow,
}: Props) {
  return (
    <>
      <PageHeading
        buttons={
          isAuthor && (
            <div className="flex gap-2">
              <Link href={`/recept/${slug}/upravit`}>
                <Button variant="ghost" size="icon" aria-label="Upravit">
                  <Pencil className="size-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Smazat"
                onClick={onDeleteShow}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          )
        }
      >
        {title}
      </PageHeading>

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
                {tags?.map((tag) => (
                  <Link key={tag} href={`/?stitky=${toSlug(tag)}`}>
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

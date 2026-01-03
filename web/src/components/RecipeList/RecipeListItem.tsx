import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

import { RecipeBaseFragment } from '../../generated/graphql';

type Props = {
  recipe: RecipeBaseFragment;
};

export function RecipeListItem({ recipe }: Props) {
  const { slug, imageThumbWebPUrl } = recipe;
  const imageUrl = imageThumbWebPUrl || '/assets/food-placeholder.webp';

  return (
    <Link href={`/recept/${slug}`}>
      <Card
        className={`
          cursor-pointer gap-0 overflow-hidden py-0 transition-shadow
          hover:bg-muted hover:shadow-lg
        `}
      >
        <div className="relative w-full pt-[75%]">
          <Image
            src={imageUrl}
            alt={recipe.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            fill
          />
        </div>
        <CardContent className="p-4">
          <h2 className="truncate text-xl font-medium">{recipe.title}</h2>
        </CardContent>
      </Card>
    </Link>
  );
}

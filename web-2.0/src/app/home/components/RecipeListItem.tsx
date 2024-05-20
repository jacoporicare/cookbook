import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import placeholderImg from './food-placeholder.webp';

import { FragmentType, graphql, useFragment } from '@/gql';

export const RecipeFragment = graphql(`
  #graphql
  fragment RecipeItem on Recipe {
    id
    slug
    title
    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)
  }
`);

type Props = {
  recipe: FragmentType<typeof RecipeFragment>;
};

export default function RecipeListItem(props: Props) {
  const recipe = useFragment(RecipeFragment, props.recipe);

  return (
    <Card>
      <Link href={`/recept/${recipe.slug}`} passHref>
        <CardActionArea>
          <CardMedia sx={{ height: 0, paddingTop: '75%' /* 4:3 */, position: 'relative' }}>
            <Image
              alt={recipe.title}
              priority={!recipe.imageThumbWebPUrl}
              quality={100}
              sizes="(max-width: 600px) 100vw,
                (max-width: 900px) 50vw,
                (max-width: 1200px) 33vw,
                (max-width: 1536px) 25vw,
                16vw"
              src={recipe.imageThumbWebPUrl ?? placeholderImg}
              style={{ objectFit: 'cover' }}
              fill
            />
          </CardMedia>
          <CardContent>
            <Typography component="h2" variant="h5" noWrap>
              {recipe.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

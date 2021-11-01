import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { LazyImage } from 'react-lazy-images';

import { RecipeBaseFragment } from '../../generated/graphql';
import useSupportsWebP from '../../hooks/useSupportsWebP';

type Props = {
  recipe: RecipeBaseFragment;
};

function RecipeListItem({ recipe }: Props) {
  const supportsWebP = useSupportsWebP();

  const { slug, imageThumbUrl, imageThumbWebPUrl } = recipe;
  const thumbUrl = supportsWebP ? imageThumbWebPUrl : imageThumbUrl;
  const placeholderUrl = `/assets/food-placeholder.${supportsWebP ? 'webp' : 'png'}`;
  const imageUrl = thumbUrl || placeholderUrl;

  return (
    <Card>
      <Link as={`/recept/${slug}`} href="/recept/[slug]" passHref>
        <CardActionArea>
          <LazyImage
            actual={({ imageProps }) => (
              <CardMedia image={imageProps.src} sx={{ height: 0, paddingTop: '75%' /* 4:3 */ }} />
            )}
            placeholder={({ ref }) => (
              <CardMedia
                ref={ref}
                image={placeholderUrl}
                sx={{ height: 0, paddingTop: '75%' /* 4:3 */ }}
              />
            )}
            src={imageUrl}
          />
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

export default RecipeListItem;

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Link from 'next/link';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

import { RecipeBaseFragment } from '../../generated/graphql';
import useSupportsWebP from '../../hooks/useSupportsWebP';

type Props = {
  recipe: RecipeBaseFragment;
};

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '75%', // 4:3
  },
});

function RecipeListItem({ recipe }: Props) {
  const classes = useStyles();
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
              <CardMedia className={classes.media} image={imageProps.src} />
            )}
            placeholder={({ ref }) => (
              <CardMedia ref={ref} className={classes.media} image={placeholderUrl} />
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

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

import { RecipeBaseFragment } from '../../generated/graphql';
import useSupportsWebP from '../../hooks/useSupportsWebP';

type Props = {
  recipe: RecipeBaseFragment;
};

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    media: {
      height: 0,
      paddingTop: '75%', // 4:3
    },
  }),
);

function RecipeListItem({ recipe }: Props) {
  const classes = useStyles();
  const supportsWebP = useSupportsWebP();

  const { slug, image } = recipe;
  const thumbUrl = supportsWebP ? image?.thumbWebPUrl : image?.thumbUrl;
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
            <Typography className={classes.title} component="h2" variant="h5">
              {recipe.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default RecipeListItem;

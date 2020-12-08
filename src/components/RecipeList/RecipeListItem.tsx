import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

import { RecipeBaseFragment } from '../../generated/graphql';
import useSupportsWebP from '../../hooks/useSupportsWebP';
import { colors } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  recipe: RecipeBaseFragment;
};

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      fontWeight: 400,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

function RecipeListItem({ recipe }: Props) {
  const classes = useStyles();
  const supportsWebP = useSupportsWebP();

  const { slug, title, preparationTime, sideDish, image } = recipe;
  const thumbUrl = supportsWebP ? image?.thumbWebPUrl : image?.thumbUrl;
  const placeholderUrl = `/assets/food-placeholder.${supportsWebP ? 'webp' : 'png'}`;
  const imageUrl = thumbUrl || placeholderUrl;

  return (
    <>
      <Link as={`/recept/${slug}`} href="/recept/[slug]">
        <a className="link">
          <LazyImage
            actual={({ imageProps }) => (
              <div className="image" style={{ backgroundImage: `url(${imageProps.src})` }} />
            )}
            placeholder={({ ref }) => (
              <div
                ref={ref}
                className="image"
                style={{ backgroundImage: `url('${placeholderUrl}')` }}
              />
            )}
            src={imageUrl}
          />
          <div className="overlay">
            <Typography className={classes.title} component="h3" variant="h5">
              {title}
            </Typography>
            <Box color={colors.gray200}>
              <RecipeInfo
                placeholder="žádné údaje"
                preparationTime={preparationTime}
                sideDish={sideDish}
              />
            </Box>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .link {
          display: block;
          color: ${colors.gray900};
          text-decoration: none;
          position: relative;
        }

        .link:hover .overlay {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .overlay {
          color: ${colors.white};
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 8px;
        }

        .image {
          height: 0;
          padding-top: 75%;
          background-size: cover;
          background-position: center center;
        }
      `}</style>
    </>
  );
}

export default RecipeListItem;

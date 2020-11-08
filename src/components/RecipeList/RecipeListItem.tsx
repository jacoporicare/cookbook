import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

import placeholder from '../../assets/food-placeholder.png';
import { RecipeBaseFragment } from '../../generated/graphql';
import RecipeInfo from '../RecipeInfo/RecipeInfo';

type Props = {
  recipe: RecipeBaseFragment;
  isAuthor?: boolean;
};

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      '&:hover $action': {
        display: 'block',
      },
    },
    content: {
      minWidth: 0,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    action: {
      display: 'none',
    },
    media: {
      height: 0,
      paddingTop: '75%', // 4:3
    },
  }),
);

function RecipeListItem({ recipe, isAuthor }: Props) {
  const classes = useStyles();

  const { slug, title, preparationTime, sideDish, image } = recipe;
  const imageUrl = image?.thumbUrl || placeholder;

  return (
    <Card className={classes.root}>
      <Link as={`/recept/${slug}`} href="/recept/[slug]">
        <CardActionArea href={`/recept/${slug}`}>
          <CardHeader
            action={
              isAuthor && (
                <Link as={`/recept/${slug}/upravit`} href="/recept/[slug]/upravit">
                  <IconButton
                    aria-label="settings"
                    href={`/recept/${slug}/upravit`}
                    onClick={e => e.stopPropagation()}
                  >
                    <Edit />
                  </IconButton>
                </Link>
              )
            }
            classes={{ content: classes.content, title: classes.title, action: classes.action }}
            subheader={
              <RecipeInfo
                placeholder="žádné údaje"
                preparationTime={preparationTime}
                sideDish={sideDish}
              />
            }
            title={title}
          />
          <CardMedia className={classes.media} image={imageUrl} title={title} />
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default RecipeListItem;

'use client';

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

import { RecipeBaseFragment } from '../../generated/graphql';

type Props = {
  recipe: RecipeBaseFragment;
};

function RecipeListItem({ recipe }: Props) {
  const { slug, imageThumbWebPUrl } = recipe;
  const imageUrl = imageThumbWebPUrl || '/assets/food-placeholder.webp';

  return (
    <Card>
      <Link href={`/recept/${slug}`}>
        <CardActionArea>
          <CardMedia
            image={imageUrl}
            sx={{ height: 0, paddingTop: '75%' /* 4:3 */ }}
            component="div"
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

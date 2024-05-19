import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';

import placeholderImg from './food-placeholder.webp';

import { FragmentType, graphql, useFragment } from '@/gql';

export const RecipeFragment = graphql(`
  fragment RecipeItem on Recipe {
    id
    #slug
    title
    #sideDish
    #tags
    #preparationTime
    #imageUrl
    #imageWebPUrl: imageUrl(format: WEBP)
    #imageThumbUrl: imageUrl(size: { width: 800, height: 800 })
    imageThumbWebPUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)
    #lastModifiedDate
  }
`);

type Props = {
  recipe: FragmentType<typeof RecipeFragment>;
};

export default function RecipeListItem(props: Props) {
  const recipe = useFragment(RecipeFragment, props.recipe);

  return (
    <Card>
      <CardMedia sx={{ height: 0, paddingTop: '75%' /* 4:3 */, position: 'relative' }}>
        <Image
          src={recipe.imageThumbWebPUrl ?? placeholderImg}
          alt={recipe.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </CardMedia>
      <CardContent>
        <Typography component="h2" variant="h5" noWrap>
          {recipe.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

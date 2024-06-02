import { Alert, Box, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import IngredientList from './IngredientList';
import RecipeHeader from './RecipeHeader';

import RichText from '@/app/components/RichText';
import { INSTANT_POT_TAG } from '@/const';
import { FragmentType, graphql, useFragment } from '@/gql';

export const RecipeDetailFragment = graphql(`
  fragment RecipeDetailItem on Recipe {
    id
    slug
    title
    tags
    directions
    imageUrl(format: WEBP)
    sideDish
    servingCount
    tags
    preparationTime
    imageUrl: imageUrl(format: WEBP)
    imageThumbUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)
    lastModifiedDate
    user {
      id
      displayName
    }
    ingredients {
      ...RecipeDetailIngredientItem
    }
  }
`);

export const RecipeDetailUserFragment = graphql(`
  fragment RecipeDetailUser on User {
    id
    isAdmin
  }
`);

type Props = {
  recipe: FragmentType<typeof RecipeDetailFragment>;
  user: FragmentType<typeof RecipeDetailUserFragment>;
};

function RecipeDetail(props: Props) {
  const recipe = useFragment(RecipeDetailFragment, props.recipe);
  const user = useFragment(RecipeDetailUserFragment, props.user);

  return (
    <>
      <RecipeHeader
        isAuthor={Boolean(user && (user.isAdmin || user.id === recipe.user.id))}
        preparationTime={recipe.preparationTime ?? undefined}
        sideDish={recipe.sideDish ?? undefined}
        slug={recipe.slug}
        tags={recipe.tags}
        title={recipe.title}
        onDeleteShow={() => {
          throw new Error('Function not implemented.');
        }}
      />

      <Grid spacing={4} container>
        <Grid lg={3} md={4} xs={12} item>
          <IngredientList
            ingredients={recipe.ingredients}
            servingCount={recipe.servingCount ?? undefined}
          />
        </Grid>

        <Grid lg={7} md={6} xs={12} item>
          <Typography component="h3" variant="h5" gutterBottom>
            Postup
          </Typography>
          {recipe.tags.includes(INSTANT_POT_TAG) && (
            <Paper>
              <Box mb={3}>
                <Alert severity="info">
                  <strong>Instant Pot</strong>
                  <br />
                  Tento recept je určený pro multifunkční hrnec Instant Pot nebo jeho kopie, např.
                  česká Tesla EliteCook K70.
                </Alert>
              </Box>
            </Paper>
          )}
          <Paper>
            {recipe.directions ? (
              <Box p={3}>
                <RichText>
                  <ReactMarkdown>{recipe.directions}</ReactMarkdown>
                </RichText>
              </Box>
            ) : (
              <Alert severity="info">Žádný postup.</Alert>
            )}
          </Paper>
        </Grid>
        <Grid md={2} xs={12} item>
          <Box pt={{ xs: 0, md: '2.525rem' }}>
            {recipe.imageUrl && recipe.imageThumbUrl && (
              <Paper>
                <Box
                  component="a"
                  href={recipe.imageUrl}
                  sx={{
                    display: 'block',
                    position: 'relative',
                    paddingTop: '75%',
                  }}
                >
                  <Image
                    alt={recipe.title}
                    quality={100}
                    sizes="(max-width: 900px) 100vw, 16vw"
                    src={recipe.imageThumbUrl}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                    fill
                  />
                </Box>
              </Paper>
            )}
            <Box my={2}>
              <Typography color="textSecondary" variant="subtitle1">
                Autor:
              </Typography>
              <Typography variant="body1">{recipe.user.displayName}</Typography>
              <Typography color="textSecondary" variant="subtitle1">
                Naposledy upraveno:
              </Typography>
              <Typography variant="body1">
                {new Date(recipe.lastModifiedDate).toLocaleDateString('cs')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default RecipeDetail;

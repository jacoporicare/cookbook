import { Alert, Box, Grid, Paper, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

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
    tags
    preparationTime
    imageUrl: imageUrl(format: WEBP)
    imageThumbUrl: imageUrl(size: { width: 800, height: 800 }, format: WEBP)
    lastModifiedDate
    user {
      displayName
    }
  }
`);

type Props = {
  recipe: FragmentType<typeof RecipeDetailFragment>;
};

function RecipeDetail(props: Props) {
  const recipe = useFragment(RecipeDetailFragment, props.recipe);

  return (
    <Grid spacing={4} container>
      <Grid lg={3} md={4} xs={12} item>
        {/* <IngredientList ingredients={ingredients} servingCount={servingCount} /> */}
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
              <ReactMarkdown>{recipe.directions}</ReactMarkdown>
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
                  lineHeight: 0,
                }}
                // onClick={handleImageClick}
              >
                <Box
                  alt={recipe.title}
                  component="img"
                  src={recipe.imageThumbUrl}
                  sx={{
                    width: '100%',
                    borderRadius: '4px',
                  }}
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
  );
}

export default RecipeDetail;

import { Alert, Box, Grid, Paper, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import Lightbox from 'react-image-lightbox';

import { Ingredient } from '../../generated/graphql';
import RichText from '../RichText/RichText';

import IngredientList from './IngredientList';

type Props = {
  title: string;
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
  userName: string;
};

function RecipeDetail({
  title,
  ingredients,
  servingCount,
  directions,
  lastModifiedDate,
  imageUrl,
  imageFullUrl,
  userName,
}: Props) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  function handleImageClick(e: MouseEvent) {
    e.preventDefault();
    setIsImageOpen(true);
  }

  return (
    <>
      <Grid spacing={4} container>
        <Grid lg={3} md={4} xs={12} item>
          <IngredientList ingredients={ingredients} servingCount={servingCount} />
        </Grid>

        <Grid lg={7} md={6} xs={12} item>
          <Typography component="h3" variant="h5" gutterBottom>
            Postup
          </Typography>
          <Paper>
            {directions ? (
              <Box p={3}>
                <RichText text={directions} />
              </Box>
            ) : (
              <Alert severity="info">Žádný postup.</Alert>
            )}
          </Paper>
        </Grid>
        <Grid md={2} xs={12} item>
          <Box pt={{ xs: 0, md: '2.525rem' }}>
            {imageUrl && (
              <Paper>
                <Box
                  component="a"
                  href={imageFullUrl}
                  sx={{
                    display: 'block',
                    lineHeight: 0,
                  }}
                  onClick={handleImageClick}
                >
                  <Box
                    alt={title}
                    component="img"
                    src={imageUrl}
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
              <Typography variant="body1">{userName}</Typography>
              <Typography color="textSecondary" variant="subtitle1">
                Naposledy upraveno:
              </Typography>
              <Typography variant="body1">
                {new Date(lastModifiedDate).toLocaleDateString('cs')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {isImageOpen && (
        <Lightbox mainSrc={imageFullUrl!} onCloseRequest={() => setIsImageOpen(false)} />
      )}
    </>
  );
}

export default RecipeDetail;

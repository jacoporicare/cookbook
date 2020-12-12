import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import { Ingredient } from '../../generated/graphql';
import RichText from '../RichText/RichText';

import IngredientList from './IngredientList';

type Props = {
  title: string;
  ingredients?: Ingredient[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: number;
  imageUrl?: string;
  imageFullUrl?: string;
  userName: string;
};

const useStyles = makeStyles({
  imageBox: {
    float: 'right',
    position: 'relative',
    zIndex: 2,
  },
  image: {
    width: '200px',
    height: '200px',
    marginLeft: '15px',
    marginBottom: '15px',
    borderRadius: '4px',
  },
  imageXs: {
    width: '100%',
    borderRadius: '4px',
    marginTop: '15px',
  },
});

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
  const classes = useStyles();

  const [isImageOpen, setIsImageOpen] = useState(false);

  function handleImageClick(e: React.MouseEvent) {
    e.preventDefault();
    setIsImageOpen(true);
  }

  return (
    <>
      <Grid spacing={4} container>
        <Grid lg={4} md={5} xl={3} xs={12} item>
          <IngredientList ingredients={ingredients} servingCount={servingCount} />
          <Box my={4}>
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
        </Grid>

        <Grid lg={8} md={7} xl={9} xs={12} item>
          <Typography component="h3" variant="h5" gutterBottom>
            Postup
          </Typography>
          <Paper>
            <Box p={3}>
              {imageUrl && (
                <Box className={classes.imageBox} display={['none', 'block']}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={imageFullUrl} target="_blank" onClick={handleImageClick}>
                    <img alt={title} className={classes.image} src={imageUrl} />
                  </a>
                </Box>
              )}
              {directions ? (
                <RichText text={directions} />
              ) : (
                <Box mr={[0, !directions && imageUrl ? '215px' : 0]}>
                  <Alert severity="info">Žádný postup.</Alert>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {imageUrl && (
        <Box display={['block', 'none']}>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={imageFullUrl} target="_blank" onClick={handleImageClick}>
            <img alt={title} className={classes.imageXs} src={imageUrl} />
          </a>
        </Box>
      )}
      {isImageOpen && (
        <Lightbox mainSrc={imageFullUrl!} onCloseRequest={() => setIsImageOpen(false)} />
      )}
    </>
  );
}

export default RecipeDetail;

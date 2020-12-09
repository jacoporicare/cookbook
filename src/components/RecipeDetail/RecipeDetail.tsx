import styled from '@emotion/styled';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import { Ingredient } from '../../generated/graphql';
import RichText from '../RichText/RichText';

import IngredientList from './IngredientList';

type Props = {
  title: string;
  ingredients: Ingredient[] | null;
  servingCount: number | null;
  directions: string | null;
  lastModifiedDate: number;
  imageUrl?: string;
  imageFullUrl?: string;
  userName: string;
};

const ImageBox = styled(Box)`
  float: right;
  position: relative;
  z-index: 2;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-left: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
`;

const ImageXs = styled.img`
  width: 100%;
  border-radius: 4px;
  margin-top: 15px;
`;

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
                <ImageBox display={['none', 'block']}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={imageFullUrl} target="_blank" onClick={handleImageClick}>
                    <Image alt={title} src={imageUrl} />
                  </a>
                </ImageBox>
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
            <ImageXs src={imageUrl} />
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

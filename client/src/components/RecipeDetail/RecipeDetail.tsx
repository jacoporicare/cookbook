import React from 'react';
import styled from 'react-emotion';

import { Ingredient } from '../../types';
import { colors } from '../../styles/colors';
import { Box, Text } from '../core';
import { InfoAlert } from '../elements/Alert';
import { RichText } from '../RichText/RichText';
import { IngredientList } from './IngredientList';

type Props = {
  ingredients?: Ingredient[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
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

export const RecipeDetail = ({
  ingredients,
  servingCount,
  directions,
  lastModifiedDate,
  imageUrl,
  imageFullUrl,
}: Props) => (
  <>
    <Box display={['block', 'flex']}>
      <Box flex={1} pr={[0, 3]}>
        <IngredientList ingredients={ingredients} servingCount={servingCount} />
        <Box my={4}>
          <Text color={colors.gray600}>Naposledy upraveno:</Text>
          <Box>{new Date(lastModifiedDate).toLocaleDateString('cs')}</Box>
        </Box>
      </Box>

      <Box flex={3}>
        {imageUrl && (
          <ImageBox display={['none', 'block']}>
            <a href={imageFullUrl} target="_blank">
              <Image src={imageUrl} />
            </a>
          </ImageBox>
        )}
        {directions ? <RichText text={directions} /> : <InfoAlert>Žádný postup.</InfoAlert>}
      </Box>
    </Box>
    {imageUrl && (
      <Box display={['block', 'none']}>
        <a href={imageFullUrl} target="_blank">
          <ImageXs src={imageUrl} />
        </a>
      </Box>
    )}
  </>
);

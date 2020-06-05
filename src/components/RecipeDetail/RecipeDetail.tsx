import styled from '@emotion/styled';
import React from 'react';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import RichText from '../RichText/RichText';
import { Box, Text, BoxAside } from '../core';
import { InfoAlert } from '../elements';

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
  return (
    <>
      <Box display={['block', 'flex']}>
        <BoxAside flex={1} pr={[0, 3]}>
          <IngredientList ingredients={ingredients} servingCount={servingCount} />
          <Box my={4}>
            <Text color={colors.gray600}>Autor:</Text>
            <Box>{userName}</Box>
            <Text color={colors.gray600}>Naposledy upraveno:</Text>
            <Box>{new Date(lastModifiedDate).toLocaleDateString('cs')}</Box>
          </Box>
        </BoxAside>

        <Box flex={3}>
          {imageUrl && (
            <ImageBox display={['none', 'block']}>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href={imageFullUrl} target="_blank">
                <Image alt={title} src={imageUrl} />
              </a>
            </ImageBox>
          )}
          {directions ? (
            <RichText text={directions} />
          ) : (
            <Box mr={[0, !directions && imageUrl ? '215px' : 0]}>
              <InfoAlert>Žádný postup.</InfoAlert>
            </Box>
          )}
        </Box>
      </Box>
      {imageUrl && (
        <Box display={['block', 'none']}>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={imageFullUrl} target="_blank">
            <ImageXs src={imageUrl} />
          </a>
        </Box>
      )}
    </>
  );
}

export default RecipeDetail;

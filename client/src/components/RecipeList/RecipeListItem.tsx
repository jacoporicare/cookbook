import React from 'react';
import { Link } from 'react-router';
import styled from 'react-emotion';

import { Recipe } from '../../types';
import { getImageUrl } from '../../utils';
import { colors } from '../../styles/colors';
import { Box } from '../core';
import { RecipeInfo } from '../RecipeInfo/RecipeInfo';

import placeholder from '../../assets/food-placeholder.png';

type Props = {
  recipe: Recipe;
};

const Overlay = styled(Box)`
  color: ${colors.white};
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledLink = styled(Link)`
  display: block;
  color: ${colors.gray900};
  text-decoration: none;
  position: relative;

  &:hover ${Overlay} {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Image = styled.div`
  height: 250px;
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecipeListItem = ({ recipe }: Props) => {
  const { slug, title, preparationTime, sideDish, hasImage, lastModifiedDate } = recipe;

  const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : placeholder;

  return (
    <StyledLink to={`/recept/${slug}`}>
      <Image style={{ backgroundImage: `url(${imageUrl})` }} />
      <Overlay p={2}>
        <Title>{title}</Title>
        <Box mt={2} color={colors.gray200} fontSize="0.75em">
          <RecipeInfo
            preparationTime={preparationTime}
            sideDish={sideDish}
            placeholder="žádné údaje"
          />
        </Box>
      </Overlay>
    </StyledLink>
  );
};

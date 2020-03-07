import styled from '@emotion/styled';
import { Link } from '@reach/router';
import gql from 'graphql-tag';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

import placeholder from '../../assets/food-placeholder.png';
import { colors } from '../../styles/colors';
import { Recipe } from '../../types';
import { getImageUrl } from '../../utils';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import { Box } from '../core';

type Props = {
  recipe: Recipe;
};

const Overlay = styled.div({
  color: colors.white,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  padding: '8px',
});

const StyledLink = styled(Link)({
  display: 'block',
  color: colors.gray900,
  textDecoration: 'none',
  position: 'relative',

  '&:hover': {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [Overlay as any]: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  },
});

const Image = styled.div({
  height: '250px',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
});

const Title = styled.h3({
  margin: 0,
  fontWeight: 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function RecipeListItem({ recipe }: Props) {
  const { slug, title, preparationTime, sideDish, hasImage, lastModifiedDate } = recipe;

  const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : placeholder;

  return (
    <StyledLink to={`/recept/${slug}`}>
      <LazyImage
        actual={({ imageProps }) => <Image style={{ backgroundImage: `url(${imageProps.src})` }} />}
        placeholder={({ ref }) => (
          <Image ref={ref} style={{ backgroundImage: `url(${placeholder})` }} />
        )}
        src={imageUrl}
      />
      <Overlay>
        <Title>{title}</Title>
        <Box color={colors.gray200} fontSize="0.75em" mt={2}>
          <RecipeInfo
            placeholder="žádné údaje"
            preparationTime={preparationTime}
            sideDish={sideDish}
          />
        </Box>
      </Overlay>
    </StyledLink>
  );
}

export const recipeBaseFragment = gql`
  fragment recipeBase on Recipe {
    _id
    title
    slug
    sideDish
    preparationTime
    user {
      _id
      displayName
    }
    hasImage
    lastModifiedDate
  }
`;

export default RecipeListItem;

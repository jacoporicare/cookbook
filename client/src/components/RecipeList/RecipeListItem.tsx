import React from 'react';
import { Link } from 'react-router';
import styled, { css } from 'react-emotion';

import { Recipe } from '../../types';
import { getImageUrl } from '../../utils';
import { RecipeInfo } from '../RecipeInfo/RecipeInfo';

import placeholder from './food-placeholder.png';

type Props = {
  recipe: Recipe;
};

const box = css`
  display: block;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  box-shadow: 0 0 12px 2px #f0f0f0;
  margin-bottom: 30px;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0 12px 2px #d8d8d8;
    text-decoration: none;
  }
`;

const BoxInner = styled.div`
  padding: 15px;
`;

const Image = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Title = styled.h4`
  margin: 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Info = styled.div`
  margin-top: 1em;
  color: #777;
`;

export const RecipeListItem = ({ recipe }: Props) => {
  const { slug, title, preparationTime, sideDish, hasImage, lastModifiedDate } = recipe;

  const imageUrl = hasImage ? getImageUrl(slug, lastModifiedDate) : placeholder;

  return (
    <div className="col-sm-6 col-md-4">
      <Link to={`/recept/${slug}`} className={box}>
        <Image style={{ backgroundImage: `url(${imageUrl})` }} />
        <BoxInner>
          <Title>{title}</Title>
          <Info>
            <RecipeInfo
              preparationTime={preparationTime}
              sideDish={sideDish}
              placeholder="žádné údaje"
            />
          </Info>
        </BoxInner>
      </Link>
    </div>
  );
};

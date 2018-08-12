import React from 'react';
import styled from 'react-emotion';

import { Ingredient } from '../../types';
import RichText from '../RichText/RichText';
import IngredientList from './IngredientList';

type Props = {
  ingredients?: Ingredient[];
  servingCount?: number;
  directions?: string;
  lastModifiedDate: string;
  imageUrl?: string;
  imageFullUrl?: string;
};

const Info = styled.p`
  margin-bottom: 20px;
`;

const ImageLink = styled.a`
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

export default function RecipeDetail({
  ingredients,
  servingCount,
  directions,
  lastModifiedDate,
  imageUrl,
  imageFullUrl,
}: Props) {
  return (
    <>
      <div className="row">
        <div className="col-md-3 col-sm-4">
          <IngredientList ingredients={ingredients} servingCount={servingCount} />
          <Info>{new Date(lastModifiedDate).toLocaleDateString('cs')}</Info>
        </div>

        <div className="col-md-9 col-sm-8">
          {imageUrl && (
            <ImageLink href={imageFullUrl} target="_blank" className="hidden-xs">
              <Image src={imageUrl} />
            </ImageLink>
          )}
          {directions ? (
            <RichText text={directions} />
          ) : (
            <div className="alert alert-info">Žádný postup.</div>
          )}
        </div>
      </div>
      {imageUrl && (
        <a href={imageFullUrl} target="_blank" className="visible-xs">
          <ImageXs src={imageUrl} />
        </a>
      )}
    </>
  );
}

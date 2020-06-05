import Link from 'next/link';
import React from 'react';
import { LazyImage } from 'react-lazy-images';

import placeholder from '../../assets/food-placeholder.png';
import { RecipeBaseFragment } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import RecipeInfo from '../RecipeInfo/RecipeInfo';
import { Box } from '../core';

type Props = {
  recipe: RecipeBaseFragment;
};

function RecipeListItem({ recipe }: Props) {
  const { slug, title, preparationTime, sideDish, image } = recipe;
  const imageUrl = image?.thumbUrl || placeholder;

  return (
    <>
      <Link as={`/recept/${slug}`} href="/recept/[slug]">
        <a className="link">
          <LazyImage
            actual={({ imageProps }) => (
              <div className="image" style={{ backgroundImage: `url(${imageProps.src})` }} />
            )}
            placeholder={({ ref }) => (
              <div
                ref={ref}
                className="image"
                style={{ backgroundImage: `url('${placeholder}')` }}
              />
            )}
            src={imageUrl}
          />
          <div className="overlay">
            <h3 className="title">{title}</h3>
            <Box color={colors.gray200} fontSize="0.75em" mt={2}>
              <RecipeInfo
                placeholder="žádné údaje"
                preparationTime={preparationTime}
                sideDish={sideDish}
              />
            </Box>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .link {
          display: block;
          color: ${colors.gray900};
          text-decoration: none;
          position: relative;
        }

        .link:hover .overlay {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .overlay {
          color: ${colors.white};
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 8px;
        }

        .image {
          height: 250px;
          background-size: cover;
          background-position: center center;
        }

        .title {
          margin: 0;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}

export default RecipeListItem;

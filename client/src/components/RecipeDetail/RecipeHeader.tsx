import React from 'react';
import { Link } from 'react-router';
import styled from 'react-emotion';

import { RecipeInfo } from '../RecipeInfo/RecipeInfo';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  slug: string;
  title: string;
  isAuthenticated: boolean;
  onDeleteShow: () => void;
};

const RecipeInfoContainer = styled.div`
  margin-bottom: 15px;
`;

export const RecipeHeader = ({
  preparationTime,
  sideDish,
  slug,
  title,
  isAuthenticated,
  onDeleteShow,
}: Props) => (
  <>
    <h1 className="page-header clearfix">
      {title}
      {isAuthenticated && (
        <span className="pull-right">
          <Link to={`/recept/${slug}/upravit`} className="btn btn-primary">
            <i className="fa fa-edit" /> Upravit
          </Link>{' '}
          <button className="btn btn-danger" onClick={onDeleteShow}>
            <i className="fa fa-trash" /> Smazat
          </button>
        </span>
      )}
    </h1>

    {(preparationTime || sideDish) && (
      <RecipeInfoContainer>
        <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
      </RecipeInfoContainer>
    )}
  </>
);

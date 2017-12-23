import React from 'react';
import { Link } from 'react-router';

import RecipeInfo from '../RecipeInfo/RecipeInfo';

import './RecipeHeader.module.css';

interface Props {
  slug: string;
  title: string;
  preparationTime?: number;
  sideDish?: string;
  onDeleteShow: () => void;
}

const RecipeHeader = ({ slug, title, preparationTime, sideDish, onDeleteShow }: Props) => (
  <div>
    <h1 className="page-header clearfix">
      {title}
      <span className="pull-right">
        <Link to={`/recept/${slug}/upravit`} className="btn btn-primary">
          <i className="fa fa-edit" /> Upravit
        </Link>{' '}
        <button className="btn btn-danger" onClick={onDeleteShow}>
          <i className="fa fa-trash" /> Smazat
        </button>
      </span>
    </h1>

    {(preparationTime || sideDish) && (
      <div styleName="recipe-info">
        <RecipeInfo preparationTime={preparationTime} sideDish={sideDish} />
      </div>
    )}
  </div>
);

export default RecipeHeader;
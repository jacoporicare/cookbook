import React from 'react';
import { Link } from 'react-router';

const RecipeListItem = ({ recipe }) => {
  const { id, title } = recipe;

  return (
    <div>
      <h2>
        <Link to={`/recept/${id}`}>{title}</Link>
      </h2>
    </div>
  );
};

export default RecipeListItem;

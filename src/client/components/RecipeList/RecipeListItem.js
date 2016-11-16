import React from 'react';
import { Link } from 'react-router';

const RecipeListItem = ({ recipe }) => {
  const { id, title } = recipe;

  return (
    <li>
      <Link to={`/recept/${id}`}>{title}</Link>
    </li>
  );
};

export default RecipeListItem;

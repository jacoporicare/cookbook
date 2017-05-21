import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const RecipeListItem = ({ recipe }) => {
  const { slug, title, preparationTime, sideDish } = recipe;

  return (
    <div className="col-sm-6 col-md-4">
      <Link to={`/recept/${slug}`} className="recipe">
        <h4 className="text-primary">{title}</h4>
        {(preparationTime > 0 || !!sideDish) &&
          <ul className="cb-info-list text-muted">
            {preparationTime > 0 && <li><i className="fa fa-clock-o" /> {preparationTime} min</li>}
            {!!sideDish && <li><i className="fa fa-spoon" /> {sideDish}</li>}
          </ul>
        }
      </Link>
    </div>
  );
};

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    preparationTime: PropTypes.number,
    sideDish: PropTypes.string,
  }).isRequired,
};

export default RecipeListItem;

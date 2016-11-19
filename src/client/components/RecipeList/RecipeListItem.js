import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const RecipeListItem = ({ recipe }) => {
  const { id, title, preparationTime, sideDish } = recipe;

  return (
    <div className="col-lg-4 col-md-6 recipe-container">
      <Link to={`/recept/${id}`} className="recipe">
        <h4 className="text-primary" title="{title}">{title}</h4>
        <ul className="cb-info-list text-muted">
					{!!preparationTime && <li><b>Doba přípravy:</b> {preparationTime} min</li>}
          {!!sideDish && <li title="{sideDish}"><b>Příloha:</b> {sideDish}</li>}
				</ul>
      </Link>
    </div>
  );
};

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeListItem;

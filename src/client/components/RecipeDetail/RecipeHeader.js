import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const RecipeHeader = ({
  slug,
  title,
  preparationTime,
  sideDish,
  onDeleteShow,
}) => (
  <div>
    <h1 className="page-header clearfix">
      {title}
      <span className="pull-right">
        <Link to={`/recept/${slug}/upravit`} className="btn btn-primary">
          <i className="fa fa-edit" /> Upravit
        </Link>
        {' '}
        <button className="btn btn-danger" onClick={onDeleteShow}>
          <i className="fa fa-trash" /> Smazat
        </button>
      </span>
    </h1>

    <ul className="cb-info-list">
      {preparationTime > 0 &&
        <li><i className="fa fa-clock-o" /> {preparationTime} min</li>}
      {!!sideDish && <li><i className="fa fa-spoon" /> {sideDish}</li>}
    </ul>
  </div>
);

RecipeHeader.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preparationTime: PropTypes.number,
  sideDish: PropTypes.string,
  onDeleteShow: PropTypes.func.isRequired,
};

export default RecipeHeader;

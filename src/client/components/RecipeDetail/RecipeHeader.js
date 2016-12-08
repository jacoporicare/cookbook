import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const RecipeHeader = ({ slug, title, preparationTime, sideDish }) => (
  <div>
    <h1 className="page-header clearfix">
      {title}
      <span className="pull-right">
        <Link to={`/recept/${slug}/upravit`} className="btn btn-primary"><i className="fa fa-edit" /> Upravit</Link>
        {' '}
        <Link to={`/recept/${slug}/smazat`} className="btn btn-danger"><i className="fa fa-trash" /> Smazat</Link>
      </span>
    </h1>

    <ul className="cb-info-list">
      {preparationTime > 0 && <li><b>Doba přípravy:</b> {preparationTime} min</li>}
      {!!sideDish && <li><b>Příloha:</b> {sideDish}</li>}
    </ul>
  </div>
);

RecipeHeader.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preparationTime: PropTypes.number,
  sideDish: PropTypes.string
};

export default RecipeHeader;

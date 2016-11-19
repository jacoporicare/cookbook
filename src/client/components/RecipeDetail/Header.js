import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({ id, title, preparationTime, sideDish }) => {
  return (
    <div>
      <h1 className="page-header clearfix">
        {title}
        <span className="pull-right">
          <Link to={`/recept/upravit/${id}`} className="btn btn-primary"><i className="fa fa-edit" /> Upravit</Link>
          {' '}
          <Link to={`/recept/smazat/${id}`} className="btn btn-danger"><i className="fa fa-trash" /> Smazat</Link>
        </span>
      </h1>

      <ul className="cb-info-list">
        {preparationTime > 0 && <li><b>Doba přípravy:</b> {preparationTime} min</li>}
        {!!sideDish && <li><b>Příloha:</b> {sideDish}</li>}
      </ul>
    </div>
  );
};

Header.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preparationTime: PropTypes.number,
  sideDish: PropTypes.string
};

export default Header;

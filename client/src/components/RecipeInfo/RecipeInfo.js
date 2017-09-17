import React from 'react';
import PropTypes from 'prop-types';
import './RecipeInfo.module.scss';

const RecipeInfo = ({ preparationTime, sideDish, placeholder }) => {
  if (!preparationTime && !sideDish) {
    return placeholder ? <div>{placeholder}</div> : null;
  }

  return (
    <ul styleName="info">
      {preparationTime > 0 && (
        <li>
          <i className="fa fa-clock-o" /> {preparationTime} min
        </li>
      )}
      {!!sideDish && (
        <li>
          <i className="fa fa-spoon" /> {sideDish}
        </li>
      )}
    </ul>
  );
};

RecipeInfo.propTypes = {
  preparationTime: PropTypes.number,
  sideDish: PropTypes.string,
  placeholder: PropTypes.node,
};

export default RecipeInfo;

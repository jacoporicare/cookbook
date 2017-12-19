import React from 'react';

import './RecipeInfo.module.scss';

interface Props {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: React.ReactNode;
}

const RecipeInfo = ({ preparationTime, sideDish, placeholder }: Props) => {
  if (!preparationTime && !sideDish) {
    return placeholder ? <div>{placeholder}</div> : null;
  }

  return (
    <ul styleName="info">
      {preparationTime &&
        preparationTime > 0 && (
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

export default RecipeInfo;

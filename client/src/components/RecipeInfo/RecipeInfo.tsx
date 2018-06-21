import React from 'react';

import './RecipeInfo.module.scss';

type Props = {
  preparationTime?: number;
  sideDish?: string;
  placeholder?: React.ReactNode;
};

function formatTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (hours > 0 && minutes === 0) {
    return `${hours} h`;
  } else if (hours > 0 && minutes > 0) {
    return `${hours} h ${minutes} min`;
  } else {
    return `${minutes} min`;
  }
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
            <i className="fa fa-clock-o" /> {formatTime(preparationTime)}
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

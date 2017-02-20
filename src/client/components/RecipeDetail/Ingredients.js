import React, { PropTypes } from 'react';

const Ingredients = ({ ingredients }) => (
  <ul className="list-group cb-ingredient-list">
    {ingredients.map((ingredient) => {
      const { _id, isGroup, name, amount, amountUnit } = ingredient;

      let className = 'list-group-item';
      if (isGroup) {
        className += ' list-group-item-warning';
      }

      return (
        <li key={_id} className={className}>
          {isGroup ?
            <b>{name}</b> :
            <div className="row">
              <div className="col-xs-3 text-right">
                {(amount || amountUnit) &&
                  <b>{amount}&nbsp;{amountUnit}</b>
                }
              </div>
              <div className="col-xs-9">{name}</div>
            </div>
          }
        </li>
      );
    })}
  </ul>
);

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default Ingredients;

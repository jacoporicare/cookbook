import React, { PropTypes } from 'react';

const Ingredients = ({ ingredients }) => {
  if (!ingredients.length) {
    return;
  }

  return (
    <ul className="list-group cb-ingredient-list">
      {ingredients.map(ingredient => {
        const { _id, isGroup, name, amount, amountUnit } = ingredient;

        let className = 'list-group-item';
        if (isGroup) {
          className += ' list-group-item-warning';
        }

        let body;
        if (!isGroup) {
          body = (
            <div className="row">
              <div className="col-xs-3 text-right">
                {(amount || amountUnit) &&
                  <b>{amount}&nbsp;{amountUnit}</b>
                }
              </div>
              <div className="col-xs-9">{name}</div>
            </div>
          );
        } else {
          body = <b>{name}</b>;
        }

        return (
          <li key={_id} className={className}>
            {body}
          </li>
        );
      })}
		</ul>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired
};

export default Ingredients;

import React, { PropTypes } from 'react';

const IngredientsList = ({ items, onRemove }) => {
  return (
    <ul className="list-group cb-ingredient-list">
      {items.map((ingredient, index) => {
        const { name, amount, amountUnit, isGroup } = ingredient;

        let className = 'list-group-item';
        if (isGroup) {
          className += ' list-group-item-warning';
        }

        return (
          <li key={index} className={className}>
            <div className="row">

              <div className="col-xs-2">
                <a href="" onClick={e => onRemove(e, index)}><i className="fa fa-trash" /></a>
              </div>

              {!isGroup &&
                <div className="col-xs-3 text-right">
                  <b>{amount}&nbsp;{amountUnit}</b>
                </div>
              }

              {!isGroup
                ? (
                  <div className="col-xs-7">
                    {name}
                    <div className="pull-right text-muted cb-sortable-handle"><i className="fa fa-bars" /></div>
                  </div>
                )
                : (
                  <div className="col-xs-10">
                    <b>{name}</b>
                    <div className="pull-right text-muted cb-sortable-handle"><i className="fa fa-bars" /></div>
                  </div>
                )
              }
            </div>
          </li>
        );
      })}
    </ul>
  );
};

IngredientsList.propTypes = {
  items: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default IngredientsList;

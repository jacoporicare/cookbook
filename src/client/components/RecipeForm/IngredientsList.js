import React, { PropTypes } from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const Handle = SortableHandle(() =>
  <div className="pull-right text-muted cb-sortable-handle">
    <i className="fa fa-bars" />
  </div>
);

const SortableItem = SortableElement(({ itemIndex, ingredient, onRemove }) => {
  const { name, amount, amountUnit, isGroup } = ingredient;

  let className = 'list-group-item';
  if (isGroup) {
    className += ' list-group-item-warning';
  }

  return (
    <li className={className}>
      <div className="row">

        <div className="col-xs-2">
          <a href="" onClick={e => onRemove(e, itemIndex)}>
            <i className="fa fa-trash" />
          </a>
        </div>

        {!isGroup &&
          <div className="col-xs-3 text-right">
            <b>{amount}&nbsp;{amountUnit}</b>
          </div>
        }

        {!isGroup ?
          <div className="col-xs-7">
            {name}
            <Handle />
          </div> :
          <div className="col-xs-10">
            <b>{name}</b>
            <Handle />
          </div>
        }
      </div>
    </li>
  );
});

const SortableList = SortableContainer(({ items, onRemove }) => (
  <ul className="list-group cb-ingredient-list">
    {items.map((ingredient, index) =>
      <SortableItem
        key={index}
        index={index}
        itemIndex={index}
        ingredient={ingredient}
        onRemove={onRemove}
      />
    )}
  </ul>
));

const IngredientsList = ({ items, onRemove, onSort }) => (
  <SortableList
    items={items}
    onRemove={onRemove}
    onSortEnd={onSort}
    useDragHandle
  />
);

IngredientsList.propTypes = {
  items: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default IngredientsList;

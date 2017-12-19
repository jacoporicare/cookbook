import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';

import { Ingredient } from '../../types';

type RemoveHandler = (index: number) => void;

interface SortableListProps {
  items: Ingredient[];
  onRemove: RemoveHandler;
}

interface Props extends SortableListProps {
  onSort: SortEndHandler;
}

const Handle = SortableHandle(() => (
  <div className="pull-right text-muted cb-sortable-handle">
    <i className="fa fa-bars" />
  </div>
));

interface SortableItemProps {
  itemIndex: number;
  ingredient: Ingredient;
  onRemove: RemoveHandler;
}

const SortableItem = SortableElement(({ itemIndex, ingredient, onRemove }: SortableItemProps) => {
  const { name, amount, amountUnit, isGroup } = ingredient;

  let className = 'list-group-item';
  if (isGroup) {
    className += ' list-group-item-warning';
  }

  return (
    <li className={className}>
      <div className="row">
        <div className="col-xs-2">
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              onRemove(itemIndex);
            }}
          >
            <i className="fa fa-trash" />
          </a>
        </div>

        {!isGroup && (
          <div className="col-xs-3 text-right">
            <b>
              {amount ? amount.toLocaleString('cs') : ''}&nbsp;{amountUnit}
            </b>
          </div>
        )}

        {!isGroup ? (
          <div className="col-xs-7">
            {name}
            <Handle />
          </div>
        ) : (
          <div className="col-xs-10">
            <b>{name}</b>
            <Handle />
          </div>
        )}
      </div>
    </li>
  );
});

const SortableList = SortableContainer(({ items, onRemove }: SortableListProps) => (
  <ul className="list-group cb-ingredient-list">
    {items.map((ingredient, index) => (
      <SortableItem
        key={index}
        index={index}
        itemIndex={index}
        ingredient={ingredient}
        onRemove={onRemove}
      />
    ))}
  </ul>
));

const IngredientList = ({ items, onRemove, onSort }: Props) => {
  if (items.length === 0) {
    return <div className="alert alert-info">Zatím žádné ingredience.</div>;
  }

  return <SortableList items={items} onRemove={onRemove} onSortEnd={onSort} useDragHandle />;
};

export default IngredientList;

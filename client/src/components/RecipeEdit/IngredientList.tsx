import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import { cx, css } from 'emotion';

import { Ingredient } from '../../types';
import { Icon } from '../Icon/Icon';

type RemoveHandler = (index: number) => void;

type SortableListProps = {
  items: Ingredient[];
  onRemove: RemoveHandler;
};

type Props = SortableListProps & {
  onSort: SortEndHandler;
};

const Handle = SortableHandle(() => (
  <div className="pull-right text-muted" style={{ cursor: 'pointer' }}>
    <Icon icon="bars" />
  </div>
));

type SortableItemProps = {
  itemIndex: number;
  ingredient: Ingredient;
  onRemove: RemoveHandler;
};

const SortableItem = SortableElement(({ itemIndex, ingredient, onRemove }: SortableItemProps) => {
  const { name, amount, amountUnit, isGroup } = ingredient;

  let className = 'list-group-item';
  if (isGroup) {
    className += ' list-group-item-warning';
  }

  return (
    <li className={className}>
      <div
        className={cx(
          'row',
          css`
            margin-left: -16px;
            margin-right: -16px;
          `,
        )}
      >
        <div className="col-xs-2">
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              onRemove(itemIndex);
            }}
          >
            <Icon icon="trash" />
          </a>
        </div>

        {!isGroup && (
          <div className="col-xs-3 text-right">
            <b>
              {amount ? amount.toLocaleString('cs') : ''}
              &nbsp;
              {amountUnit}
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
  <ul className="list-group">
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

export const IngredientList = ({ items, onRemove, onSort }: Props) => {
  if (items.length === 0) {
    return <div className="alert alert-info">Zatím žádné ingredience.</div>;
  }

  return <SortableList items={items} onRemove={onRemove} onSortEnd={onSort} useDragHandle />;
};

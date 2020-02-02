import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import { darken } from 'polished';
import { css } from '@emotion/core';

import { Ingredient } from '../../types';
import { colors } from '../../styles/colors';
import { Box } from '../core';
import { InfoAlert } from '../elements';
import Icon from '../common/Icon';

type RemoveHandler = (index: number) => void;

type SortableListProps = {
  items: Ingredient[];
  onRemove: RemoveHandler;
};

type Props = SortableListProps & {
  onSort: SortEndHandler;
};

const Handle = SortableHandle(() => (
  <Box
    css={css`
      color: ${colors.gray600};
      cursor: pointer;

      &:hover {
        color: ${colors.gray900};
      }
    `}
    p={2}
  >
    <Icon icon="bars" />
  </Box>
));

type SortableItemProps = {
  itemIndex: number;
  ingredient: Ingredient;
  onRemove: RemoveHandler;
};

const Item = Box.withComponent('li');

const SortableItem = SortableElement(({ itemIndex, ingredient, onRemove }: SortableItemProps) => {
  const { name, amount, amountUnit, isGroup } = ingredient;

  return (
    <Item
      borderTop={`1px solid ${colors.gray300}`}
      css={{ backgroundColor: isGroup ? colors.gray200 : colors.white }}
      display="flex"
    >
      <Box
        css={css`
          color: ${colors.red};
          cursor: pointer;
          &:hover {
            color: ${darken(0.1, colors.red)};
          }
        `}
        p={2}
        onClick={() => {
          onRemove(itemIndex);
        }}
      >
        <Icon icon="trash" />
      </Box>

      {!isGroup ? (
        <>
          <Box flex={2} p={2} textAlign="right">
            {amount ? amount.toLocaleString('cs') : ''}
          </Box>
          <Box flex={1} p={2} pl={0}>
            {amountUnit}
          </Box>
          <Box flex={7} p={2}>
            {name}
          </Box>
        </>
      ) : (
        <Box flex={1} p={2} textAlign="center">
          <b>{name}</b>
        </Box>
      )}
      <Handle />
    </Item>
  );
});

const SortableList = SortableContainer(({ items, onRemove }: SortableListProps) => (
  <ul css={{ listStyle: 'none', margin: 0, padding: 0 }}>
    {items.map((ingredient, index) => (
      <SortableItem
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        index={index}
        ingredient={ingredient}
        itemIndex={index}
        onRemove={onRemove}
      />
    ))}
  </ul>
));

function IngredientList({ items, onRemove, onSort }: Props) {
  if (items.length === 0) {
    return <InfoAlert>Zatím žádné ingredience.</InfoAlert>;
  }

  return <SortableList items={items} useDragHandle onRemove={onRemove} onSortEnd={onSort} />;
}

export default IngredientList;

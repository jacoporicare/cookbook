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
    p={2}
    css={css`
      color: ${colors.gray600};
      cursor: pointer;

      &:hover {
        color: ${colors.gray900};
      }
    `}
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
      display="flex"
      bg={isGroup ? colors.gray200 : colors.white}
      borderTop={`1px solid ${colors.gray300}`}
    >
      <Box
        p={2}
        css={css`
          color: ${colors.red};
          cursor: pointer;
          &:hover {
            color: ${darken(0.1, colors.red)};
          }
        `}
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
        key={index}
        index={index}
        itemIndex={index}
        ingredient={ingredient}
        onRemove={onRemove}
      />
    ))}
  </ul>
));

function IngredientList({ items, onRemove, onSort }: Props) {
  if (items.length === 0) {
    return <InfoAlert>Zatím žádné ingredience.</InfoAlert>;
  }

  return <SortableList items={items} onRemove={onRemove} onSortEnd={onSort} useDragHandle />;
}

export default IngredientList;

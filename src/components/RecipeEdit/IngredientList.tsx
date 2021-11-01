import { Delete, Menu } from '@mui/icons-material';
import {
  Alert,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';

type RemoveHandler = (index: number) => void;

type SortableListProps = {
  items: Omit<Ingredient, '_id' | 'id'>[];
  onRemove: RemoveHandler;
};

type Props = SortableListProps & {
  onSort: SortEndHandler;
};

const Handle = SortableHandle(() => <Menu />);

type SortableItemProps = {
  itemIndex: number;
  ingredient: Omit<Ingredient, '_id' | 'id'>;
  onRemove: RemoveHandler;
};

const SortableItem = SortableElement(({ itemIndex, ingredient, onRemove }: SortableItemProps) => {
  const { name, amount, amountUnit, isGroup } = ingredient;

  return (
    <ListItem
      sx={
        isGroup
          ? {
              listStyle: 'none',
              backgroundColor: colors.gray200,
            }
          : {
              listStyle: 'none',
            }
      }
    >
      <ListItemIcon>
        <Handle />
      </ListItemIcon>

      <ListItemText>
        <Grid spacing={1} container>
          <Grid xs={1} item>
            <Box textAlign="right">{amount ? amount.toLocaleString('cs') : ''}</Box>
          </Grid>
          <Grid xs={3} item>
            {amountUnit}
          </Grid>
          <Grid xs={8} item>
            {isGroup ? <b>{name}</b> : name}
          </Grid>
        </Grid>
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label="Smazat" edge="end" size="large" onClick={() => onRemove(itemIndex)}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

const SortableList = SortableContainer(({ items, onRemove }: SortableListProps) => (
  <List>
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
  </List>
));

function IngredientList({ items, onRemove, onSort }: Props) {
  if (items.length === 0) {
    return <Alert severity="info">Zatím žádné ingredience.</Alert>;
  }

  return <SortableList items={items} useDragHandle onRemove={onRemove} onSortEnd={onSort} />;
}

export default IngredientList;

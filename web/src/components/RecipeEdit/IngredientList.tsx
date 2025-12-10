'use client';

import { Delete, DragIndicator } from '@mui/icons-material';
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
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';

type RemoveHandler = (index: number) => void;
type SortHandler = (args: { oldIndex: number; newIndex: number }) => void;

type Props = {
  items: Omit<Ingredient, '_id' | 'id'>[];
  onRemove: RemoveHandler;
  onSort: SortHandler;
};

type SortableItemProps = {
  id: string;
  itemIndex: number;
  ingredient: Omit<Ingredient, '_id' | 'id'>;
  onRemove: RemoveHandler;
};

function SortableItem({ id, itemIndex, ingredient, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { name, amount, amountUnit, isGroup } = ingredient;

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
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
      <ListItemIcon {...attributes} {...listeners} sx={{ cursor: 'grab' }}>
        <DragIndicator />
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
}

function IngredientList({ items, onRemove, onSort }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = items.map((_, index) => `item-${index}`);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id as string);
      const newIndex = ids.indexOf(over.id as string);
      onSort({ oldIndex, newIndex });
    }
  }

  if (items.length === 0) {
    return <Alert severity="info">Zatím žádné ingredience.</Alert>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <List>
          {items.map((ingredient, index) => (
            <SortableItem
              key={`item-${index}`}
              id={`item-${index}`}
              ingredient={ingredient}
              itemIndex={index}
              onRemove={onRemove}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default IngredientList;

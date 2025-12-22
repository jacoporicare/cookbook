'use client';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Ingredient } from '../../generated/graphql';

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

function SortableItem({
  id,
  itemIndex,
  ingredient,
  onRemove,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { name, amount, amountUnit, isGroup } = ingredient;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        `
          flex items-center gap-2 border-b border-border px-1 py-2
          last:border-b-0
        `,
        isGroup && 'bg-muted',
      )}
    >
      <button
        type="button"
        className={`
          cursor-grab touch-none p-1 text-muted-foreground
          hover:text-foreground
        `}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-5" />
      </button>

      <div className="grid flex-1 grid-cols-12 gap-1 text-sm">
        <div className="col-span-2 text-right">
          {amount ? amount.toLocaleString('cs') : ''}
        </div>
        <div className="col-span-3">{amountUnit}</div>
        <div className="col-span-7">
          {isGroup ? <strong>{name}</strong> : name}
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Smazat"
        onClick={() => onRemove(itemIndex)}
      >
        <Trash2 className="size-4" />
      </Button>
    </li>
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
    return (
      <Alert>
        <AlertDescription>Zatím žádné ingredience.</AlertDescription>
      </Alert>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className="m-0 list-none p-0">
          {items.map((ingredient, index) => (
            <SortableItem
              key={`item-${index}`}
              id={`item-${index}`}
              ingredient={ingredient}
              itemIndex={index}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default IngredientList;

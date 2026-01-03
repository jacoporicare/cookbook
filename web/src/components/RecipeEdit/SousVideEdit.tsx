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
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn, formatTemperature } from '@/lib/utils';

export type SousVideOption = {
  temperature: number;
  time: string;
  label: string;
};

export type AddSousVideOptionHandler = (option: SousVideOption) => void;
export type RemoveSousVideOptionHandler = (index: number) => void;
export type SortSousVideHandler = (args: {
  oldIndex: number;
  newIndex: number;
}) => void;

type Props = {
  items: SousVideOption[];
  onAdd: AddSousVideOptionHandler;
  onRemove: RemoveSousVideOptionHandler;
  onSort: SortSousVideHandler;
};

type SortableItemProps = {
  id: string;
  itemIndex: number;
  option: SousVideOption;
  onRemove: RemoveSousVideOptionHandler;
};

function SortableItem({ id, itemIndex, option, onRemove }: SortableItemProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        `
          flex items-center gap-2 border-b border-border px-1 py-2
          last:border-b-0
        `,
        isDragging && 'z-10 opacity-50',
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

      <div className="flex flex-1 items-center gap-3 text-sm">
        <span className="font-medium">
          {formatTemperature(option.temperature)}°C
        </span>
        <span className="text-muted-foreground">{option.time}</span>
        <span className="rounded bg-muted px-2 py-0.5">{option.label}</span>
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

function SousVideList({
  items,
  onRemove,
  onSort,
}: {
  items: SousVideOption[];
  onRemove: RemoveSousVideOptionHandler;
  onSort: SortSousVideHandler;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = items.map((_, index) => `sous-vide-${index}`);

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
        <AlertDescription>Zatím žádné sous-vide možnosti.</AlertDescription>
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
          {items.map((option, index) => (
            <SortableItem
              key={`sous-vide-${index}`}
              id={`sous-vide-${index}`}
              option={option}
              itemIndex={index}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export function SousVideEdit({ items, onAdd, onRemove, onSort }: Props) {
  const [temperature, setTemperature] = useState<number | undefined>();
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  function handleAdd() {
    if (!temperature || !time || !label) {
      return;
    }

    onAdd({ temperature, time, label });
    setTemperature(undefined);
    setTime('');
    setLabel('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="space-y-6">
      <SousVideList items={items} onRemove={onRemove} onSort={onSort} />
      <Separator />
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="sv-temperature">Teplota (°C)</Label>
            <Input
              id="sv-temperature"
              type="number"
              step="0.5"
              value={temperature ?? ''}
              onChange={(e) => {
                const parsed = Number.parseFloat(e.target.value);
                setTemperature(Number.isNaN(parsed) ? undefined : parsed);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sv-time">Čas</Label>
            <Input
              id="sv-time"
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sv-label">Popisek</Label>
            <Input
              id="sv-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAdd}
          disabled={!temperature || !time || !label}
        >
          <Plus className="mr-2 size-4" />
          Přidat možnost
        </Button>
      </div>
    </div>
  );
}

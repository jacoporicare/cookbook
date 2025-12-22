import { KeyboardEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type IngredientFields = 'amount' | 'amountUnit' | 'name';

type Props = {
  name?: string;
  amount?: number | string;
  amountUnit?: string;
  ingredientOptions: string[];
  onChange: (name: IngredientFields, value: string) => void;
  onAdd: () => void;
};

function IngredientForm({
  name,
  amount,
  amountUnit,
  ingredientOptions,
  onChange,
  onAdd,
}: Props) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (name) {
        onAdd();
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ingredientName">Nová ingredience</Label>
        <Input
          id="ingredientName"
          list="ingredientOptions"
          value={name ?? ''}
          onChange={(e) => onChange('name', e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <datalist id="ingredientOptions">
          {ingredientOptions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 space-y-2">
          <Label htmlFor="ingredientAmount">Množství</Label>
          <Input
            id="ingredientAmount"
            type="number"
            min={0}
            value={amount ?? ''}
            onChange={(e) => onChange('amount', e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="ingredientUnit">Jednotka</Label>
          <Input
            id="ingredientUnit"
            value={amountUnit ?? ''}
            onChange={(e) => onChange('amountUnit', e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button type="button" disabled={!name} onClick={onAdd}>
          Přidat
        </Button>
      </div>
    </div>
  );
}

export default IngredientForm;

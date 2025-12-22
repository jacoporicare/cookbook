import { KeyboardEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type IngredientGroupFields = 'group';

type Props = {
  group?: string;
  onChange: (name: IngredientGroupFields, value: string) => void;
  onAdd: () => void;
};

function IngredientGroupForm({ group = '', onChange, onAdd }: Props) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (group) {
        onAdd();
      }
    }
  }

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 space-y-2">
        <Label htmlFor="group">Nová skupina</Label>
        <Input
          id="group"
          value={group}
          onChange={(e) => onChange('group', e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button type="button" disabled={!group} onClick={onAdd}>
        Přidat
      </Button>
    </div>
  );
}

export default IngredientGroupForm;

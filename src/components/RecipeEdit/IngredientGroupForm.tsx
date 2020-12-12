import { Button, Grid, TextField } from '@material-ui/core';
import React, { KeyboardEvent } from 'react';

export type IngredientGroupFields = 'group';

type Props = {
  group?: string;
  onChange: (name: IngredientGroupFields, value: string) => void;
  onAdd: () => void;
};

function IngredientGroupForm({ group = '', onChange, onAdd }: Props) {
  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (group) {
        onAdd();
      }
    }
  }

  return (
    <Grid alignItems="flex-end" spacing={2} container>
      <Grid item xs>
        <TextField
          label="Nová skupina"
          value={group}
          fullWidth
          onChange={e => onChange('group', e.currentTarget.value)}
          onKeyPress={handleKeyPress}
        />
      </Grid>
      <Grid item>
        <Button disabled={!group} onClick={onAdd}>
          Přidat
        </Button>
      </Grid>
    </Grid>
  );
}

export default IngredientGroupForm;

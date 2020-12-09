import { Button, Grid, TextField } from '@material-ui/core';
import React, { KeyboardEvent, ChangeEventHandler } from 'react';

type Props = {
  group?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
          name="newGroup"
          value={group}
          fullWidth
          onChange={onChange}
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

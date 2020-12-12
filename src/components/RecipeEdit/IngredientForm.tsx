import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { KeyboardEvent } from 'react';

type Props = {
  name: string | null;
  amount: number | string | null;
  amountUnit: string | null;
  ingredientOptions: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onAdd: () => void;
};

function IngredientForm({ name, amount, amountUnit, ingredientOptions, onChange, onAdd }: Props) {
  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (name) {
        onAdd();
      }
    }
  }

  return (
    <>
      <Grid spacing={2} container>
        <Grid item xs>
          <TextField
            inputProps={{ min: 0 }}
            label="Množství"
            name="amount"
            type="number"
            value={amount ?? ''}
            fullWidth
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Jednotka"
            name="amountUnit"
            value={amountUnit ?? ''}
            fullWidth
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid alignItems="flex-end" spacing={2} container>
          <Grid item xs>
            <Autocomplete
              options={ingredientOptions}
              renderInput={params => <TextField {...params} label="Název" name="name" />}
              disableClearable
              freeSolo
              onChange={onChange as React.ChangeEventHandler<{}>}
            />
          </Grid>
          <Grid item>
            <Button disabled={!name} onClick={onAdd}>
              Přidat
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default IngredientForm;

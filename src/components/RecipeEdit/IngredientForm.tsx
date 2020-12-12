import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { KeyboardEvent } from 'react';

export type IngredientFields = 'amount' | 'amountUnit' | 'name';

type Props = {
  name?: string;
  amount?: number | string;
  amountUnit?: string;
  ingredientOptions: string[];
  onChange: (name: IngredientFields, value: string) => void;
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
            type="number"
            value={amount ?? ''}
            fullWidth
            onChange={e => onChange('amount', e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Jednotka"
            value={amountUnit ?? ''}
            fullWidth
            onChange={e => onChange('amountUnit', e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid alignItems="flex-end" spacing={2} container>
          <Grid item xs>
            <Autocomplete
              options={ingredientOptions}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Název"
                  onChange={e => onChange('name', e.currentTarget.value)}
                  onKeyPress={handleKeyPress}
                />
              )}
              value={name ?? ''}
              disableClearable
              freeSolo
              onChange={(_, value) => onChange('name', value)}
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

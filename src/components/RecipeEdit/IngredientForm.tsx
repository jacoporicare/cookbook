import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { KeyboardEvent } from 'react';

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
      <Autocomplete
        options={ingredientOptions}
        renderInput={params => (
          <TextField
            {...params}
            label="Nová ingredience"
            variant="filled"
            onChange={e => onChange('name', e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
        )}
        value={name ?? ''}
        disableClearable
        freeSolo
        onChange={(_, value) => onChange('name', value)}
      />
      <Box mt={2}>
        <Grid alignItems="flex-end" spacing={2} container>
          <Grid item xs>
            <TextField
              inputProps={{ min: 0 }}
              label="Množství"
              type="number"
              value={amount ?? ''}
              variant="filled"
              fullWidth
              onChange={e => onChange('amount', e.currentTarget.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Jednotka"
              value={amountUnit ?? ''}
              variant="filled"
              fullWidth
              onChange={e => onChange('amountUnit', e.currentTarget.value)}
              onKeyPress={handleKeyPress}
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

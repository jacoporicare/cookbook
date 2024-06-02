'use client';

import {
  Alert,
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

import { colors } from '@/colors';
import { FragmentType, graphql, useFragment } from '@/gql';

export const RecipeDetailIngredientFragment = graphql(`
  fragment RecipeDetailIngredientItem on Ingredient {
    id
    isGroup
    name
    amount
    amountUnit
  }
`);

type Props = {
  ingredients?: FragmentType<typeof RecipeDetailIngredientFragment>[];
  servingCount?: number;
};

function IngredientList(props: Props) {
  const ingredients = useFragment(RecipeDetailIngredientFragment, props.ingredients);
  const theme = useTheme();
  const [servingCount, setServingCount] = useState(props.servingCount);

  useEffect(() => {
    setServingCount(props.servingCount);
  }, [props.servingCount]);

  function getAmount(amount?: number) {
    if (!amount) {
      return '';
    }

    if (!servingCount || !props.servingCount) {
      return amount.toLocaleString('cs');
    }

    return ((amount / props.servingCount) * servingCount).toLocaleString('cs');
  }

  function handleServingCountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const parsedValue = Number(event.target.value);

    setServingCount(value !== '' && !Number.isNaN(parsedValue) ? Math.abs(parsedValue) : undefined);
  }

  function handleServingCountBlur() {
    if (props.servingCount && !servingCount) {
      setServingCount(props.servingCount);
    }
  }

  return (
    <>
      <Typography component="h3" variant="h5" gutterBottom>
        Ingredience
      </Typography>
      <TableContainer component={Paper}>
        {(!ingredients || !ingredients.length) && <Alert severity="info">Žádné ingredience.</Alert>}

        {Boolean(props.servingCount) && (
          <Box mt={1}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ paddingLeft: theme.spacing(2) }}>
                    Počet porcí
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 1 }}
              type="number"
              value={!servingCount ? '' : servingCount}
              variant="standard"
              fullWidth
              onBlur={handleServingCountBlur}
              onChange={handleServingCountChange}
            />
          </Box>
        )}

        {ingredients && ingredients.length > 0 && (
          <Table size="small">
            <TableBody>
              {ingredients.map(ingredient => {
                return (
                  <TableRow
                    key={ingredient.id}
                    sx={ingredient.isGroup ? { backgroundColor: colors.gray200 } : undefined}
                  >
                    <TableCell align="right" width="20%">
                      {!ingredient.isGroup && getAmount(ingredient.amount ?? undefined)}
                    </TableCell>
                    <TableCell width="10%">
                      {!ingredient.isGroup && ingredient.amountUnit}
                    </TableCell>
                    <TableCell>
                      <Typography variant={ingredient.isGroup ? 'subtitle1' : 'body1'}>
                        {ingredient.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

export default IngredientList;

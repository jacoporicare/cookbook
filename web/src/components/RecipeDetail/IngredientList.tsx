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

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';

type Props = {
  ingredients?: Omit<Ingredient, '_id'>[];
  servingCount?: number;
};

function IngredientList(props: Props) {
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

  const { ingredients, servingCount: initialServingCount } = props;

  return (
    <>
      <Typography component="h3" variant="h5" gutterBottom>
        Ingredience
      </Typography>
      <TableContainer component={Paper}>
        {(!ingredients || !ingredients.length) && <Alert severity="info">Žádné ingredience.</Alert>}

        {Boolean(initialServingCount) && (
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
                const { id, isGroup, name, amount, amountUnit } = ingredient;

                return (
                  <TableRow key={id} sx={isGroup ? { backgroundColor: colors.gray200 } : undefined}>
                    <TableCell align="right" width="20%">
                      {!isGroup && getAmount(amount ?? undefined)}
                    </TableCell>
                    <TableCell width="10%">{!isGroup && amountUnit}</TableCell>
                    <TableCell>
                      <Typography variant={isGroup ? 'subtitle1' : 'body1'}>{name}</Typography>
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

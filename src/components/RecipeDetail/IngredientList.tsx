import {
  Box,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';

type Props = {
  ingredients: Ingredient[] | null;
  servingCount: number | null;
};

const useStyles = makeStyles(theme => ({
  group: {
    backgroundColor: colors.gray200,
  },
  adorment: {
    paddingLeft: theme.spacing(2),
  },
}));

function IngredientList(props: Props) {
  const classes = useStyles();

  const [servingCount, setServingCount] = useState(props.servingCount);

  useEffect(() => {
    setServingCount(props.servingCount);
  }, [props.servingCount]);

  function getAmount(amount: number | null) {
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

    setServingCount(value !== '' && !Number.isNaN(parsedValue) ? Math.abs(parsedValue) : null);
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
                  <InputAdornment className={classes.adorment} position="start">
                    Počet porcí
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 1 }}
              type="number"
              value={!servingCount ? '' : servingCount}
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
                const { _id, isGroup, name, amount, amountUnit } = ingredient;

                return (
                  <TableRow key={_id} className={isGroup ? classes.group : undefined}>
                    <TableCell align="right" width="20%">
                      {!isGroup && getAmount(amount)}
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

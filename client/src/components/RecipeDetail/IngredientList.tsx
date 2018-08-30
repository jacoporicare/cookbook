import React, { Component, ChangeEvent } from 'react';

import { Ingredient } from '../../types';
import { colors } from '../../styles/colors';
import { Box, Text } from '../core';
import { InfoAlert } from '../elements/Alert';
import { Input } from '../elements/Input';
import { InputAddon } from '../elements/InputAddon';
import { Table, TableRow, TableCell } from '../elements/Table';

type Props = {
  ingredients?: Ingredient[];
  servingCount?: number;
};

type State = {
  servingCount?: number;
};

export class IngredientList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      servingCount: props.servingCount,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      servingCount: nextProps.servingCount,
    });
  }

  getAmount(amount?: number) {
    if (!amount) {
      return '';
    }

    if (!this.state.servingCount || !this.props.servingCount) {
      return amount.toLocaleString('cs');
    }

    return ((amount / this.props.servingCount) * this.state.servingCount).toLocaleString('cs');
  }

  handleServingCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      servingCount: Math.abs(Number(event.target.value) || 1),
    });
  };

  render() {
    const { ingredients, servingCount: initialServingCount } = this.props;
    const { servingCount } = this.state;

    if (!ingredients || !ingredients.length) {
      return <InfoAlert>Žádné ingredience.</InfoAlert>;
    }

    return (
      <>
        {Boolean(initialServingCount) && (
          <Box display="flex" mb={2}>
            <InputAddon isPrepend>Počet porcí</InputAddon>
            <Input
              type="number"
              value={String(servingCount)}
              onChange={this.handleServingCountChange}
              min={1}
              flex="auto"
              hasPrependAddon
            />
          </Box>
        )}

        <Table width={1}>
          <tbody>
            {ingredients.map(ingredient => {
              const { _id: id, isGroup, name, amount, amountUnit } = ingredient;

              if (isGroup) {
                return (
                  <TableRow key={id} bg={colors.gray200}>
                    <TableCell colSpan={3} textAlign="center">
                      <Text fontWeight={600}> {name}</Text>
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={id}>
                  <TableCell width="20%" textAlign="right">
                    {this.getAmount(amount)}
                  </TableCell>
                  <TableCell width="10%">{amountUnit}</TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

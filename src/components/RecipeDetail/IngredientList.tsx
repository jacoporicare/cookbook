import React, { ChangeEvent, Component } from 'react';

import { Ingredient } from '../../generated/graphql';
import { colors } from '../../styles/colors';
import { Box, Text } from '../core';
import { InfoAlert, Input, InputAddon, Table, TableCell, TableRow } from '../elements';

type Props = {
  ingredients: Ingredient[] | null;
  servingCount: number | null;
};

type State = {
  servingCount: number | null;
};

export default class IngredientList extends Component<Props, State> {
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

  getAmount(amount: number | null) {
    if (!amount) {
      return '';
    }

    if (!this.state.servingCount || !this.props.servingCount) {
      return amount.toLocaleString('cs');
    }

    return ((amount / this.props.servingCount) * this.state.servingCount).toLocaleString('cs');
  }

  handleServingCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = Number(event.target.value);

    this.setState({
      servingCount: value !== '' && !Number.isNaN(parsedValue) ? Math.abs(parsedValue) : null,
    });
  };

  handleServingCountBlur = () => {
    if (this.props.servingCount && !this.state.servingCount) {
      this.setState({ servingCount: this.props.servingCount });
    }
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
              flex="auto"
              min={1}
              type="number"
              value={!servingCount ? '' : servingCount}
              hasPrependAddon
              onBlur={this.handleServingCountBlur}
              onChange={this.handleServingCountChange}
            />
          </Box>
        )}

        <Table width={1}>
          <tbody>
            {ingredients.map(ingredient => {
              const { _id, isGroup, name, amount, amountUnit } = ingredient;

              if (isGroup) {
                return (
                  <TableRow key={_id} css={{ backgroundColor: colors.gray200 }}>
                    <TableCell colSpan={3} textAlign="center">
                      <Text fontWeight={600}> {name}</Text>
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={_id}>
                  <TableCell textAlign="right" width="20%">
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

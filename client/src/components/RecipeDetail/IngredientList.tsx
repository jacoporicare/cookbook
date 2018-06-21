import React, { Component, ChangeEvent } from 'react';

import { Ingredient } from '../../types';

type Props = {
  ingredients?: Ingredient[];
  servingCount?: number;
};

type State = {
  servingCount: string;
};

class IngredientList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      servingCount: props.servingCount ? props.servingCount.toString() : '',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      servingCount: nextProps.servingCount ? nextProps.servingCount.toString() : '',
    });
  }

  getAmount(amount?: number) {
    if (!amount) {
      return '';
    }

    if (!this.state.servingCount || !this.props.servingCount) {
      return amount.toLocaleString('cs');
    }

    return (
      (amount / this.props.servingCount) *
      Number.parseInt(this.state.servingCount, 10)
    ).toLocaleString('cs');
  }

  handleServingCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const servingCount = Number.parseInt(event.target.value, 10);

    this.setState({
      servingCount: !Number.isNaN(servingCount) && servingCount > 0 ? servingCount.toString() : '',
    });
  };

  render() {
    const { ingredients, servingCount: initialServingCount } = this.props;
    const { servingCount } = this.state;

    if (!ingredients || !ingredients.length) {
      return <div className="alert alert-info">Žádné ingredience.</div>;
    }

    return (
      <>
        {!!initialServingCount && (
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Počet porcí</div>
              <input
                type="number"
                value={servingCount}
                onChange={this.handleServingCountChange}
                min={1}
                className="form-control"
              />
            </div>
          </div>
        )}

        <ul className="list-group cb-ingredient-list">
          {ingredients.map(ingredient => {
            const { _id: id, isGroup, name, amount, amountUnit } = ingredient;

            let className = 'list-group-item';
            if (isGroup) {
              className += ' list-group-item-warning';
            }

            return (
              <li key={id} className={className}>
                {isGroup ? (
                  <b>{name}</b>
                ) : (
                  <div className="row">
                    <div className="col-xs-3 text-right">
                      {(amount || amountUnit) && (
                        <b>
                          {this.getAmount(amount)}&nbsp;{amountUnit}
                        </b>
                      )}
                    </div>
                    <div className="col-xs-9">{name}</div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default IngredientList;

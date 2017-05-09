import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      servingCount: props.servingCount,
    };
  }

  getAmount(amount) {
    if (!amount) {
      return '';
    }

    if (!this.state.servingCount) {
      return amount.toLocaleString('cs');
    }

    return ((amount / this.props.servingCount) * this.state.servingCount).toLocaleString('cs');
  }

  handleServingCountChange = (event) => {
    const servingCount = Number.parseInt(event.target.value, 10);

    this.setState({
      servingCount: !Number.isNaN(servingCount) && servingCount > 0 ? servingCount : '',
    });
  }

  render() {
    const { ingredients, servingCount: initialServingCount } = this.props;
    const { servingCount } = this.state;

    if (!ingredients || !ingredients.length) {
      return <div className="alert alert-info">Žádné ingredience.</div>;
    }

    return (
      <div>
        {!!initialServingCount &&
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">
                Počet porcí
              </div>
              <input
                type="number"
                value={servingCount}
                onChange={this.handleServingCountChange}
                min={1}
                className="form-control"
              />
            </div>
          </div>
        }

        <ul className="list-group cb-ingredient-list">
          {ingredients.map((ingredient) => {
            const { _id, isGroup, name, amount, amountUnit } = ingredient;

            let className = 'list-group-item';
            if (isGroup) {
              className += ' list-group-item-warning';
            }

            return (
              <li key={_id} className={className}>
                {isGroup ?
                  <b>{name}</b> :
                  <div className="row">
                    <div className="col-xs-3 text-right">
                      {(amount || amountUnit) &&
                        <b>{this.getAmount(amount)}&nbsp;{amountUnit}</b>
                      }
                    </div>
                    <div className="col-xs-9">{name}</div>
                  </div>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredients: PropTypes.array,
  servingCount: PropTypes.number,
};

export default Ingredients;

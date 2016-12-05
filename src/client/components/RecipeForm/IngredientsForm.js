import React, { PropTypes } from 'react';

const initialIngredient = {
  name: '',
  amount: '',
  amountUnit: ''
};

class IngredientsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ingredient: initialIngredient };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  parseValue(value, type) {
    switch (type) {
      case 'number': {
        const parsedValue = Number.parseInt(value, 10);
        return !Number.isNaN(parsedValue) ? parsedValue : '';
      }

      default:
        return value;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const ingredient = {
      ...this.state.ingredient,
      [name]: this.parseValue(value, event.target.type)
    };
    this.setState({ ingredient });
  }

  handleAdd(event) {
    this.props.onAdd(event, this.state.ingredient);
    this.setState({ ingredient: initialIngredient });
  }

  render() {
    const { name, amount, amountUnit } = this.state.ingredient;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Přidat ingredienci
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-6">
              <div className="form-group">
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={this.handleChange}
                  min="0"
                  className="form-control"
                  placeholder="Množství"
                />
              </div>
            </div>
            <div className="col-xs-6">
              <div className="form-group">
                <input
                  type="text"
                  name="amountUnit"
                  value={amountUnit}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Jednotka"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Název"
              />
              <div className="input-group-btn">
                <button
                  type="button"
                  onClick={this.handleAdd}
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus" /> Přidat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IngredientsForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default IngredientsForm;

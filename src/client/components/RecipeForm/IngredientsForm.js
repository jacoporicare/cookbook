import React, { PropTypes } from 'react';

const initialIngredient = {
  name: '',
  amount: '',
  amountUnit: ''
};

class IngredientsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: initialIngredient,
      group: ''
    };

    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
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

  handleGroupChange(event) {
    this.setState({
      group: event.target.value
    });
  }

  handleAddIngredient(event) {
    this.props.onAdd(event, this.state.ingredient);
    this.setState({
      ingredient: initialIngredient
    });
  }

  handleAddGroup(event) {
    this.props.onAddGroup(event, this.state.group);
    this.setState({
      group: ''
    });
  }

  render() {
    const {
      ingredient: { name, amount, amountUnit },
      group
    } = this.state;

    return (
      <div>
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
                    onClick={this.handleAddIngredient}
                    className="btn btn-primary"
                  >
                    <i className="fa fa-plus" /> Přidat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              name="newGroup"
              value={group}
              onChange={this.handleGroupChange}
              className="form-control"
              placeholder="Nová skupina"
            />
            <div className="input-group-btn">
              <button
                type="button"
                onClick={this.handleAddGroup}
                className="btn btn-default"
              >
                <i className="fa fa-plus" /> Přidat
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

IngredientsForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onAddGroup: PropTypes.func.isRequired
};

export default IngredientsForm;

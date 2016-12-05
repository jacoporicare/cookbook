import React, { PropTypes } from 'react';

class IngredientsGroupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { group: '' };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ group: event.target.value });
  }

  handleAdd(event) {
    this.props.onAdd(event, this.state.group);
    this.setState({ group: '' });
  }

  render() {
    const { group } = this.state;

    return (
      <div className="form-group">
        <div className="input-group">
          <input
            type="text"
            name="newGroup"
            value={group}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Nová skupina"
          />
          <div className="input-group-btn">
            <button
              type="button"
              onClick={this.handleAdd}
              className="btn btn-default"
            >
              <i className="fa fa-plus" /> Přidat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

IngredientsGroupForm.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default IngredientsGroupForm;

import React, { PropTypes } from 'react';

class IngredientsGroupForm extends React.Component {
  handleKeyPress = (event) => {
    if (event.which === 13) {
      event.preventDefault();

      if (this.props.group) {
        this.props.onAdd(event);
      }
    }
  }

  render() {
    const { group, onChange, onAdd } = this.props;

    return (
      <div className="form-group">
        <div className="input-group">
          <input
            type="text"
            name="newGroup"
            value={group}
            onChange={onChange}
            onKeyPress={this.handleKeyPress}
            className="form-control"
            placeholder="Nová skupina"
          />
          <div className="input-group-btn">
            <button
              type="button"
              onClick={onAdd}
              className="btn btn-default"
              disabled={!group}
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
  group: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default IngredientsGroupForm;

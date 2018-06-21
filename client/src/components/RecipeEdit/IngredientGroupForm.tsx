import React, { KeyboardEvent, ChangeEventHandler } from 'react';

type Props = {
  group?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onAdd: () => void;
};

class IngredientGroupForm extends React.Component<Props> {
  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (this.props.group) {
        this.props.onAdd();
      }
    }
  };

  render() {
    const { group = '', onChange, onAdd } = this.props;

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
            <button type="button" onClick={onAdd} className="btn btn-default" disabled={!group}>
              <i className="fa fa-plus" /> Přidat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientGroupForm;

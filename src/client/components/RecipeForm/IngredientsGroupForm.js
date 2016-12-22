import React, { PropTypes } from 'react';

const IngredientsGroupForm = ({ group, onChange, onAdd }) => (
  <div className="form-group">
    <div className="input-group">
      <input
        type="text"
        name="newGroup"
        value={group}
        onChange={onChange}
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

IngredientsGroupForm.propTypes = {
  group: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default IngredientsGroupForm;

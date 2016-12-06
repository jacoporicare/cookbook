import React, { PropTypes } from 'react';

const IngredientsForm = ({ ingredient, onChange, onAdd }) => {
  const { name, amount, amountUnit } = ingredient;

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
                onChange={onChange}
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
                onChange={onChange}
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
              onChange={onChange}
              className="form-control"
              placeholder="Název"
            />
            <div className="input-group-btn">
              <button
                type="button"
                onClick={onAdd}
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
};

IngredientsForm.propTypes = {
  ingredient: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default IngredientsForm;

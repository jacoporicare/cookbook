import React, { PropTypes } from 'react';
import RichText from '../RichText/RichText';
import Spinner from '../Spinner/Spinner';
import Ingredients from './Ingredients';

const RecipeForm = ({ recipe, errors, isSaving, onChange, onSubmit, onAddIngredient, onRemoveIngredient }) => {
  const {
    title = '',
    preparationTime = '',
    servingCount = '',
    sideDish = '',
    directions = '',
    ingredients
  } = recipe;

  const hasError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} className="form">
      {isSaving && <Spinner overlay />}

      <h1 className="page-header clearfix">
        {title || 'Název receptu'}
        <span className="pull-right">
          <button type="submit" className="btn btn-success" disabled={hasError || isSaving}>
            <i className="fa fa-save" />{' '}
            {isSaving ? <span>Ukládání&hellip;</span> : 'Uložit'}
          </button>
        </span>
      </h1>

      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            className="form-control"
            placeholder="Název"
          />
          {errors.title && <span className="text-danger">Název je povinný</span>}
        </div>
      </fieldset>

      <div className="row">
        <div className="col-md-2">
          <fieldset>
            <legend>Základní údaje</legend>

            <div className="form-group">
              <label htmlFor="preparationTime">Doba přípravy</label>
              <div className="input-group">
                <input
                  type="number"
                  min="1"
                  id="preparationTime"
                  name="preparationTime"
                  value={preparationTime}
                  onChange={onChange}
                  className="form-control"
                />
                <span className="input-group-addon">min</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="servingCount">Počet porcí</label>
              <input
                type="number"
                min="1"
                id="servingCount"
                name="servingCount"
                value={servingCount}
                onChange={onChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sideDish">Příloha</label>
              <input
                type="text"
                id="sideDish"
                name="sideDish"
                value={sideDish}
                onChange={onChange}
                className="form-control"
              />
            </div>

          </fieldset>
        </div>

        <div className="col-md-4">
          <fieldset>
            <legend>Ingredience</legend>
            {ingredients && ingredients.length > 0
              ? <Ingredients items={ingredients} onAdd={onAddIngredient} onRemove={onRemoveIngredient} />
              : <div className="alert alert-info">Zatím žádné ingredience.</div>
            }
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset>
            <legend>Postup</legend>
            <div className="form-group">
              <textarea
                id="directions"
                name="directions"
                value={directions}
                onChange={onChange}
                rows="20"
                className="form-control"
              />
              <div className="help-block text-right">
                <ul className="list-inline">
                  <li><strong>*tučně*</strong></li>
                  <li><em>_kurzíva_</em></li>
                  <li>*) seznam</li>
                </ul>
              </div>
            </div>
          </fieldset>

          <p className="text-right">
            <button type="submit" className="btn btn-success btn-lg" disabled={hasError || isSaving}>
              <i className="fa fa-save" />{' '}
              {isSaving ? <span>Ukládání&hellip;</span> : 'Uložit'}
            </button>
          </p>
        </div>
      </div>

      <fieldset>
        <legend>Náhled postupu</legend>
        <RichText text={directions} />
      </fieldset>

    </form>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  onRemoveIngredient: PropTypes.func.isRequired
};

export default RecipeForm;

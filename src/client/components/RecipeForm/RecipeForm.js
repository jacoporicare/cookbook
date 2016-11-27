import React, {PropTypes} from 'react';

class RecipeForm extends React.Component {
  render() {
    const { title } = this.props.recipe;

    return (
      <form className="form" noValidate>

        <h1 className="page-header clearfix">
          {title || 'Název receptu'}
          <span className="pull-right">
            <button type="button" className="btn btn-success">
              <i className="fa fa-save" />{' '}Uložit
            </button>
          </span>
        </h1>

        <fieldset>
          <div className="form-group">
            <input type="text" name="title" id="title" className="form-control" placeholder="Název" required />
            <span className="text-danger">Název je povinný</span>
          </div>
        </fieldset>

        <div className="row">
          <div className="col-md-2">
            <fieldset>
              <legend>Základní údaje</legend>

              <div className="form-group">
                <label htmlFor="preparationTime">Doba přípravy</label>
                <div className="input-group">
                  <input type="number" min="1" name="preparationTime" id="preparationTime" className="form-control" />
                  <span className="input-group-addon">min</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="servingCount">Počet porcí</label>
                <input type="number" min="1" name="servingCount" id="servingCount" className="form-control" />
              </div>

              <div className="form-group">
                <label htmlFor="sideDish">Příloha</label>
                <input type="text" name="sideDish" id="sideDish" className="form-control" />
              </div>

            </fieldset>
          </div>

          <div className="col-md-4">
            <fieldset>
              <legend>Ingredience</legend>
            </fieldset>
          </div>

          <div className="col-md-6">
            <fieldset>
              <legend>Postup</legend>
              <div className="form-group">
                <textarea name="directions" id="directions" rows="20" className="form-control" />
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
              <button type="button" className="btn btn-success btn-lg">
                <i className="fa fa-save" />{' '}Uložit
              </button>
            </p>
          </div>
        </div>

        <fieldset>
          <legend>Náhled postupu</legend>
        </fieldset>

      </form>
    );
  }
}

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeForm;

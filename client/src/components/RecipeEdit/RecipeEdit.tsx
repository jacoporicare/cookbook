import React, { KeyboardEvent, FormEventHandler } from 'react';
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import removeDiacritics from 'javascript-remove-diacritics';
import { Link } from 'react-router';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient, AutosuggestChangeEventHandler } from '../../types';
import RichText from '../RichText/RichText';
import Spinner from '../Spinner/Spinner';
import IngredientEdit, {
  AddIngredientEventHandler,
  AddGroupEventHandler,
  RemoveEventHandler,
} from './IngredientEdit';

interface Props {
  slug?: string;
  title?: string;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  directions?: string;
  ingredients: Ingredient[];
  ingredientOptions: string[];
  sideDishOptions: string[];
  changed: boolean;
  onChange: AutosuggestChangeEventHandler;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onAddIngredient: AddIngredientEventHandler;
  onAddGroup: AddGroupEventHandler;
  onRemoveIngredient: RemoveEventHandler;
  onSortIngredient: SortEndHandler;
  isNew: boolean;
  isSaving: boolean;
}

interface State {
  sideDishOptions: string[];
}

class RecipeEdit extends React.Component<Props, State> {
  titleInput: HTMLInputElement | null;

  state = {
    sideDishOptions: [],
  };

  componentDidMount() {
    if (this.titleInput) {
      this.titleInput.focus();
    }
  }

  handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    if (!value) {
      return;
    }

    const valueLowerCase = removeDiacritics.replace(value).toLowerCase();
    this.setState({
      sideDishOptions: this.props.sideDishOptions.filter(sd =>
        removeDiacritics
          .replace(sd)
          .toLowerCase()
          .includes(valueLowerCase),
      ),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ sideDishOptions: [] });
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  renderSuggestion = (suggestion: string) => <span>{suggestion}</span>;

  render() {
    const {
      slug,
      title = '',
      preparationTime = '',
      servingCount = '',
      sideDish = '',
      directions = '',
      ingredients,
      ingredientOptions,
      changed,
      isNew,
      isSaving,
      onChange,
      onSubmit,
      onAddIngredient,
      onAddGroup,
      onRemoveIngredient,
      onSortIngredient,
    } = this.props;
    const { sideDishOptions } = this.state;

    return (
      <form onSubmit={onSubmit} className="form">
        {isSaving && <Spinner overlay />}

        <h1 className="page-header clearfix">
          {title || (isNew ? 'Nový recept' : 'Název receptu')}
          <span className="pull-right">
            <button
              type="submit"
              className="btn btn-success"
              disabled={!title || isSaving || !changed}
            >
              <i className="fa fa-save" /> {isSaving ? <span>Ukládání…</span> : 'Uložit'}
            </button>{' '}
            <Link to={isNew && slug ? '/' : `/recept/${slug}`} className="btn btn-default">
              Zrušit
            </Link>
          </span>
        </h1>

        <fieldset>
          <div className={`form-group ${!title ? 'has-error' : ''}`}>
            <input
              ref={titleInput => {
                this.titleInput = titleInput;
              }}
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              className="form-control"
              placeholder="Název"
            />
            {!title && <span className="text-danger">Název je povinný</span>}
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
                <Autosuggest
                  suggestions={sideDishOptions}
                  onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                  getSuggestionValue={s => s}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={{
                    id: 'sideDish',
                    name: 'sideDish',
                    value: sideDish,
                    onChange: (event, selectEvent) => onChange(event, selectEvent, 'sideDish'),
                    onKeyPress: this.handleKeyPress,
                    className: 'form-control',
                  }}
                />
              </div>
            </fieldset>
          </div>

          <div className="col-md-4">
            <fieldset>
              <legend>Ingredience</legend>
              <IngredientEdit
                items={ingredients}
                ingredientOptions={ingredientOptions}
                onAdd={onAddIngredient}
                onAddGroup={onAddGroup}
                onRemove={onRemoveIngredient}
                onSort={onSortIngredient}
              />
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
                  rows={20}
                  className="form-control"
                />
                <div className="help-block clearfix">
                  <div className="pull-right">
                    <a
                      href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Návod na Markdown
                    </a>
                  </div>
                </div>
              </div>
            </fieldset>

            <p className="text-right">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={!title || isSaving || !changed}
              >
                <i className="fa fa-save" /> {isSaving ? <span>Ukládání…</span> : 'Uložit'}
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
  }
}

export default RecipeEdit;

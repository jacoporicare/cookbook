import React, { FormEventHandler } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { Ingredient, AutosuggestChangeEventHandler } from '../../types';
import RichText from '../RichText/RichText';
import Spinner from '../Spinner/Spinner';
import Header from './Header';
import Title from './Title';
import BasicInfo from './BasicInfo';
import Directions from './Directions';
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

class RecipeEdit extends React.Component<Props> {
  render() {
    const {
      slug,
      title,
      preparationTime,
      servingCount,
      sideDish,
      directions,
      ingredients,
      ingredientOptions,
      sideDishOptions,
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

    return (
      <form onSubmit={onSubmit} className="form">
        {isSaving && <Spinner overlay />}

        <Header title={title} isNew={isNew} isSaving={isSaving} changed={changed} slug={slug} />

        <fieldset>
          <Title title={title} onChange={onChange} />
        </fieldset>

        <div className="row">
          <div className="col-md-2">
            <fieldset>
              <legend>Základní údaje</legend>
              <BasicInfo
                preparationTime={preparationTime}
                servingCount={servingCount}
                sideDish={sideDish}
                sideDishOptions={sideDishOptions}
                onChange={onChange}
              />
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
              <Directions directions={directions} onChange={onChange} />
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

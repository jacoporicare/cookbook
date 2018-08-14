import React, { FormEventHandler } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { AutosuggestChangeEventHandler, Ingredient } from '../../types';
import { Icon } from '../Icon/Icon';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { RichText } from '../RichText/RichText';
import { Spinner } from '../Spinner/Spinner';
import { BasicInfo } from './BasicInfo';
import { Directions } from './Directions';
import { Header } from './Header';
import {
  AddGroupEventHandler,
  AddIngredientEventHandler,
  IngredientEdit,
  RemoveEventHandler,
} from './IngredientEdit';
import { Title } from './Title';

type Props = {
  changed: boolean;
  directions?: string;
  imageUrl?: string;
  ingredientOptions: string[];
  ingredients: Ingredient[];
  isNew: boolean;
  isSaving: boolean;
  onAddGroup: AddGroupEventHandler;
  onAddIngredient: AddIngredientEventHandler;
  onChange: AutosuggestChangeEventHandler;
  onImageChange: (data: ArrayBuffer) => void;
  onRemoveIngredient: RemoveEventHandler;
  onSortIngredient: SortEndHandler;
  onSubmit: FormEventHandler<HTMLFormElement>;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  slug?: string;
  title?: string;
};

export class RecipeEdit extends React.Component<Props> {
  render() {
    const {
      changed,
      directions,
      imageUrl,
      ingredientOptions,
      ingredients,
      isNew,
      isSaving,
      onAddGroup,
      onAddIngredient,
      onChange,
      onImageChange,
      onRemoveIngredient,
      onSortIngredient,
      onSubmit,
      preparationTime,
      servingCount,
      sideDish,
      sideDishOptions,
      slug,
      title,
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
                <Icon icon="save" /> {isSaving ? <span>Ukládání…</span> : 'Uložit'}
              </button>
            </p>
          </div>
        </div>

        <fieldset>
          <legend>Náhled postupu</legend>
          <ImageUpload imageUrl={imageUrl} onImageChange={onImageChange} />
          <RichText text={directions} />
        </fieldset>
      </form>
    );
  }
}

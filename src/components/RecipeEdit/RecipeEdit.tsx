import React, { FormEventHandler } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { AutosuggestChangeEventHandler, Ingredient } from '../../types';
import Spinner from '../common/Spinner';
import { Box } from '../core';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import RichText from '../RichText/RichText';
import BasicInfo from './BasicInfo';
import Directions from './Directions';
import Header from './Header';
import IngredientEdit, {
  AddGroupEventHandler,
  AddIngredientEventHandler,
  RemoveEventHandler,
} from './IngredientEdit';
import Title from './Title';

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
  onImageChange: (data: File) => void;
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

export default class RecipeEdit extends React.Component<Props> {
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
      <form onSubmit={onSubmit}>
        {isSaving && <Spinner overlay />}

        <Header title={title} isNew={isNew} isSaving={isSaving} changed={changed} slug={slug} />

        <fieldset>
          <Title title={title} onChange={onChange} />
        </fieldset>

        <Box display={['block', 'block', 'flex']}>
          <Box flex={1} pr={[0, 0, 3]} mb={3}>
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
          </Box>

          <Box flex={[1, 1, 1, 2]} px={[0, 0, 3]} mb={3}>
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
          </Box>

          <Box flex={[1, 1, 1, 3]} pl={[0, 0, 3]} mb={3}>
            <fieldset>
              <legend>Postup</legend>
              <Directions directions={directions} onChange={onChange} />
            </fieldset>

            {/* <Box textAlign="center">
              <SuccessButton type="submit" disabled={!title || isSaving || !changed}>
                <Icon icon="save" regular /> {isSaving ? <span>Ukládání…</span> : 'Uložit'}
              </SuccessButton>
            </Box> */}
          </Box>
        </Box>

        <fieldset>
          <legend>Náhled postupu</legend>
          <ImageUpload imageUrl={imageUrl} onImageChange={onImageChange} />
          <RichText text={directions} />
        </fieldset>
      </form>
    );
  }
}

import React, { FormEventHandler } from 'react';
import { SortEndHandler } from 'react-sortable-hoc';

import { AutosuggestChangeEventHandler, Ingredient } from '../../types';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import RichText from '../RichText/RichText';
import Spinner from '../common/Spinner';
import { Box } from '../core';

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
  onTagsChange: (tags: string[]) => void;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
  slug?: string;
  tags?: string[];
  tagOptions: string[];
  title?: string;
};

function RecipeEdit({
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
  onTagsChange,
  preparationTime,
  servingCount,
  sideDish,
  sideDishOptions,
  slug,
  tags,
  tagOptions,
  title,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      {isSaving && <Spinner overlay />}

      <Header changed={changed} isNew={isNew} isSaving={isSaving} slug={slug} title={title} />

      <fieldset>
        <Title title={title} onChange={onChange} />
      </fieldset>

      <Box display={['block', 'block', 'flex']}>
        <Box flex={1} mb={3} pr={[0, 0, 3]}>
          <fieldset>
            <legend>Základní údaje</legend>
            <BasicInfo
              preparationTime={preparationTime}
              servingCount={servingCount}
              sideDish={sideDish}
              sideDishOptions={sideDishOptions}
              tagOptions={tagOptions}
              tags={tags}
              onChange={onChange}
              onTagsChange={onTagsChange}
            />
          </fieldset>
        </Box>

        <Box flex={[1, 1, 1, 2]} mb={3} px={[0, 0, 3]}>
          <fieldset>
            <legend>Ingredience</legend>
            <IngredientEdit
              ingredientOptions={ingredientOptions}
              items={ingredients}
              onAdd={onAddIngredient}
              onAddGroup={onAddGroup}
              onRemove={onRemoveIngredient}
              onSort={onSortIngredient}
            />
          </fieldset>
        </Box>

        <Box flex={[1, 1, 1, 3]} mb={3} pl={[0, 0, 3]}>
          <fieldset>
            <legend>Postup</legend>
            <Directions directions={directions} onChange={onChange} />
          </fieldset>
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

export default RecipeEdit;

import { FormEventHandler } from 'react';

import { Card } from '@/components/ui/card';

import { INSTANT_POT_TAG } from '../../const';
import { Ingredient } from '../../generated/graphql';
import ImageUpload from '../ImageUpload/ImageUpload';
import RichText from '../RichText/RichText';
import Spinner from '../common/Spinner';
import BasicInfo, { BasicInfoFields } from './BasicInfo';
import Directions, { DirectionsFields } from './Directions';
import Header from './Header';
import IngredientEdit, {
  AddGroupEventHandler,
  AddIngredientEventHandler,
  RemoveEventHandler,
  SortHandler,
} from './IngredientEdit';
import Title, { TitleFields } from './Title';

export type RecipeEditFields = TitleFields | BasicInfoFields | DirectionsFields;

type Props = {
  changed: boolean;
  directions?: string;
  imageUrl?: string;
  ingredientOptions: string[];
  ingredients: Omit<Ingredient, '_id' | 'id'>[];
  isNew: boolean;
  isSaving: boolean;
  onAddGroup: AddGroupEventHandler;
  onAddIngredient: AddIngredientEventHandler;
  onChange: (name: RecipeEditFields, value: string) => void;
  onImageChange: (data: File) => void;
  onRemoveIngredient: RemoveEventHandler;
  onSortIngredient: SortHandler;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onTagsChange: (tags: string[]) => void;
  preparationTime?: number;
  servingCount?: number;
  sideDish?: string;
  sideDishOptions: string[];
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
  tags,
  tagOptions,
  title,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      {isSaving && <Spinner overlay />}

      <Header
        changed={changed}
        isInstantPotNewRecipe={!!tags?.includes(INSTANT_POT_TAG)}
        isNew={isNew}
        isSaving={isSaving}
        title={title}
      />

      <Title title={title} onChange={onChange} />

      <div className={`
        mt-8 grid grid-cols-1 gap-8
        md:grid-cols-12
      `}>
        <div className={`
          md:col-span-3
          xl:col-span-2
        `}>
          <h3 className="mb-4 text-xl font-medium">Základní údaje</h3>
          <Card className="p-6">
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
          </Card>
        </div>

        <div className="md:col-span-4">
          <h3 className="mb-4 text-xl font-medium">Ingredience</h3>
          <Card className="p-6">
            <IngredientEdit
              ingredientOptions={ingredientOptions}
              items={ingredients}
              onAdd={onAddIngredient}
              onAddGroup={onAddGroup}
              onRemove={onRemoveIngredient}
              onSort={onSortIngredient}
            />
          </Card>
        </div>

        <div className={`
          md:col-span-5
          xl:col-span-6
        `}>
          <h3 className="mb-4 text-xl font-medium">Postup</h3>
          <Card className="p-6">
            <Directions directions={directions} onChange={onChange} />
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-medium">Náhled postupu</h3>
        <ImageUpload imageUrl={imageUrl} onImageChange={onImageChange} />
        <RichText text={directions} />
      </div>
    </form>
  );
}

export default RecipeEdit;

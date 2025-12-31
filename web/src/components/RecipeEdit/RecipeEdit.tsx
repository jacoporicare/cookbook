import { Card } from '@/components/ui/card';

import { INSTANT_POT_TAG } from '../../const';
import { Ingredient } from '../../generated/graphql';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import { RichText } from '../RichText/RichText';
import { Spinner } from '../common/Spinner';
import { BasicInfo } from './BasicInfo';
import { Directions } from './Directions';
import { Header } from './Header';
import {
  AddGroupEventHandler,
  AddIngredientEventHandler,
  IngredientEdit,
  RemoveEventHandler,
  SortHandler,
} from './IngredientEdit';
import { Title } from './Title';

type DefaultValues = {
  title: string;
  directions: string;
  preparationTime: string;
  servingCount: string;
  sideDish: string;
};

type Props = {
  defaultValues: DefaultValues;
  formAction: (payload: FormData) => void;
  imageId?: string;
  imageUrl?: string;
  ingredientOptions: string[];
  ingredients: Omit<Ingredient, '_id' | 'id'>[];
  isNew: boolean;
  isSaving: boolean;
  onAddGroup: AddGroupEventHandler;
  onAddIngredient: AddIngredientEventHandler;
  onChange: () => void;
  onImageChange: (data: File) => void;
  onRemoveIngredient: RemoveEventHandler;
  onSortIngredient: SortHandler;
  onTagsChange: (tags: string[]) => void;
  sideDishOptions: string[];
  tags: string[];
  tagOptions: string[];
};

export function RecipeEdit({
  defaultValues,
  formAction,
  imageId,
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
  onTagsChange,
  sideDishOptions,
  tags,
  tagOptions,
}: Props) {
  return (
    <form action={formAction}>
      {isSaving && <Spinner overlay />}

      {/* Hidden inputs for complex data */}
      {imageId && <input type="hidden" name="imageId" value={imageId} />}

      {/* Hidden inputs for ingredients array */}
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="hidden"
            name={`ingredients[${index}].name`}
            value={ingredient.name}
          />
          <input
            type="hidden"
            name={`ingredients[${index}].amount`}
            value={ingredient.amount ?? ''}
          />
          <input
            type="hidden"
            name={`ingredients[${index}].amountUnit`}
            value={ingredient.amountUnit ?? ''}
          />
          <input
            type="hidden"
            name={`ingredients[${index}].isGroup`}
            value={String(ingredient.isGroup ?? false)}
          />
        </div>
      ))}

      {/* Hidden inputs for tags array */}
      {tags.map((tag, index) => (
        <input key={index} type="hidden" name="tags[]" value={tag} />
      ))}

      <Header
        isInstantPotNewRecipe={tags.includes(INSTANT_POT_TAG)}
        isNew={isNew}
        isSaving={isSaving}
        title={defaultValues.title}
      />

      <Title defaultValue={defaultValues.title} onChange={onChange} />

      <div
        className={`
          mt-8 grid grid-cols-1 gap-8
          md:grid-cols-12
        `}
      >
        <div
          className={`
            md:col-span-3
            xl:col-span-2
          `}
        >
          <h3 className="mb-4 text-xl font-medium">Základní údaje</h3>
          <Card className="p-6">
            <BasicInfo
              defaultPreparationTime={defaultValues.preparationTime}
              defaultServingCount={defaultValues.servingCount}
              defaultSideDish={defaultValues.sideDish}
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

        <div
          className={`
            md:col-span-5
            xl:col-span-6
          `}
        >
          <h3 className="mb-4 text-xl font-medium">Postup</h3>
          <Card className="p-6">
            <Directions
              defaultValue={defaultValues.directions}
              onChange={onChange}
            />
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-medium">Náhled postupu</h3>
        <ImageUpload imageUrl={imageUrl} onImageChange={onImageChange} />
        <RichText text={defaultValues.directions} />
      </div>
    </form>
  );
}

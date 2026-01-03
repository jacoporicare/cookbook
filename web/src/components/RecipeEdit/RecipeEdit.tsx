import {
  Camera,
  CookingPot,
  Eye,
  Info,
  ShoppingBasket,
  Thermometer,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SOUS_VIDE_TAG } from '@/const';
import { cn } from '@/lib/utils';

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
import {
  AddSousVideOptionHandler,
  RemoveSousVideOptionHandler,
  SortSousVideHandler,
  SousVideEdit,
  SousVideOption,
} from './SousVideEdit';
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
  onAddSousVideOption: AddSousVideOptionHandler;
  onChange: () => void;
  onImageChange: (data: File) => void;
  onRemoveIngredient: RemoveEventHandler;
  onRemoveSousVideOption: RemoveSousVideOptionHandler;
  onSortIngredient: SortHandler;
  onSortSousVideOption: SortSousVideHandler;
  onTagsChange: (tags: string[]) => void;
  sideDishOptions: string[];
  sousVideOptions: SousVideOption[];
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
  onAddSousVideOption,
  onChange,
  onImageChange,
  onRemoveIngredient,
  onRemoveSousVideOption,
  onSortIngredient,
  onSortSousVideOption,
  onTagsChange,
  sideDishOptions,
  sousVideOptions,
  tags,
  tagOptions,
}: Props) {
  const isSousVide = tags.includes(SOUS_VIDE_TAG);

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

      {/* Hidden inputs for sousVideOptions array */}
      {sousVideOptions.map((option, index) => (
        <div key={index}>
          <input
            type="hidden"
            name={`sousVideOptions[${index}].temperature`}
            value={option.temperature}
          />
          <input
            type="hidden"
            name={`sousVideOptions[${index}].time`}
            value={option.time}
          />
          <input
            type="hidden"
            name={`sousVideOptions[${index}].label`}
            value={option.label}
          />
        </div>
      ))}

      <Header isNew={isNew} isSaving={isSaving} title={defaultValues.title} />

      <Title defaultValue={defaultValues.title} onChange={onChange} />

      <div
        className={`
          mt-8 grid grid-cols-1 gap-8
          md:grid-cols-12
        `}
      >
        <div
          className={cn(
            'md:col-span-4',
            isSousVide ? 'lg:col-span-3' : 'lg:col-span-4',
            'xl:col-span-3',
          )}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="size-5" />
                Základní údaje
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>

        <div
          className={cn(
            'md:col-span-8',
            isSousVide ? 'lg:col-span-5' : 'lg:col-span-8',
            'xl:col-span-5',
          )}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBasket className="size-5" />
                Ingredience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IngredientEdit
                ingredientOptions={ingredientOptions}
                items={ingredients}
                onAdd={onAddIngredient}
                onAddGroup={onAddGroup}
                onRemove={onRemoveIngredient}
                onSort={onSortIngredient}
              />
            </CardContent>
          </Card>
        </div>

        {isSousVide && (
          <div
            className={`
              md:col-span-12
              lg:col-span-4
              xl:col-span-4
            `}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="size-5" />
                  Sous-vide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SousVideEdit
                  items={sousVideOptions}
                  onAdd={onAddSousVideOption}
                  onRemove={onRemoveSousVideOption}
                  onSort={onSortSousVideOption}
                />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="md:col-span-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CookingPot className="size-5" />
                Postup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Directions
                defaultValue={defaultValues.directions}
                onChange={onChange}
              />
            </CardContent>
          </Card>
        </div>

        <div
          className={`
            flex flex-col gap-8
            md:col-span-12 md:flex-row
          `}
        >
          <div className="md:shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="size-5" />
                  Fotka
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  imageUrl={imageUrl}
                  onImageChange={onImageChange}
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:min-w-0 md:flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="size-5" />
                  Náhled postupu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichText text={defaultValues.directions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
}

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

import {
  RecipeFormState,
  createRecipeAction,
  updateRecipeAction,
} from '@/app/actions/recipe';
import Layout from '@/components/Layout';
import RecipeEdit, {
  RecipeEditFields,
} from '@/components/RecipeEdit/RecipeEdit';
import { INSTANT_POT_TAG, INSTANT_POT_TAG_SLUG } from '@/const';
import { Ingredient, RecipeEditQuery, RecipeInput } from '@/generated/graphql';
import { uploadImage } from '@/lib/image-upload';
import { useAuth } from '@/lib/use-auth';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

type Props = {
  recipe?: NonNullable<RecipeEditQuery['recipe']>;
  options: {
    ingredients: string[];
    sideDishes: string[];
    tags: string[];
  };
};

export default function RecipeEditPage({
  recipe: initialRecipe,
  options,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token] = useAuth();
  const [isPending, startTransition] = useTransition();

  const isInstantPotNewRecipe = searchParams.has(INSTANT_POT_TAG_SLUG);
  const isNew = !initialRecipe;

  const [changed, setChanged] = useState(false);
  const [image, setImage] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(false);

  // Initialize state from props
  const [title, setTitle] = useState(initialRecipe?.title ?? '');
  const [sideDish, setSideDish] = useState(initialRecipe?.sideDish ?? '');
  const [directions, setDirections] = useState(initialRecipe?.directions ?? '');
  const [preparationTime, setPreparationTime] = useState<number | undefined>(
    initialRecipe?.preparationTime ?? undefined,
  );
  const [servingCount, setServingCount] = useState<number | undefined>(
    initialRecipe?.servingCount ?? undefined,
  );
  const [ingredients, setIngredients] = useState<
    Omit<Ingredient, '_id' | 'id'>[]
  >(
    initialRecipe?.ingredients?.map((i) => ({
      name: i.name,
      amount: i.amount,
      amountUnit: i.amountUnit,
      isGroup: i.isGroup,
    })) ?? [],
  );
  const [tags, setTags] = useState<string[]>(
    initialRecipe?.tags ?? (isInstantPotNewRecipe ? [INSTANT_POT_TAG] : []),
  );

  const isSaving = isPending || uploadProgress;

  useEffect(() => {
    if (changed) {
      window.onbeforeunload = (e: BeforeUnloadEvent) => {
        e.returnValue = confirmMsg;
        return confirmMsg;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [changed]);

  function handleChange(name: RecipeEditFields, value: string) {
    switch (name) {
      case 'title':
        setTitle(value);
        break;

      case 'sideDish':
        setSideDish(value);
        break;

      case 'directions':
        setDirections(value);
        break;

      case 'preparationTime': {
        const parsed = Number.parseInt(value, 10);
        setPreparationTime(Number.isNaN(parsed) ? undefined : parsed);
        break;
      }

      case 'servingCount': {
        const parsed = Number.parseInt(value, 10);
        setServingCount(Number.isNaN(parsed) ? undefined : parsed);
        break;
      }

      default:
        break;
    }

    setChanged(true);
  }

  function handleAddIngredient(
    name: string,
    amount?: number,
    amountUnit?: string,
  ) {
    setChanged(true);
    setIngredients([
      ...ingredients,
      {
        name,
        amount: amount ?? null,
        amountUnit: amountUnit ?? null,
        isGroup: false,
      },
    ]);
  }

  function handleAddGroup(group: string) {
    setChanged(true);
    setIngredients([
      ...ingredients,
      {
        name: group,
        amount: null,
        amountUnit: null,
        isGroup: true,
      },
    ]);
  }

  function handleRemoveIngredient(index: number) {
    setChanged(true);
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function handleSortIngredient({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) {
    const newIngredients = [...ingredients];
    newIngredients.splice(newIndex, 0, newIngredients.splice(oldIndex, 1)[0]);

    setChanged(true);
    setIngredients(newIngredients);
  }

  function handleImageChange(data: File) {
    setChanged(true);
    setImage(data);
  }

  function handleTagsChange(tags: string[]) {
    setChanged(true);
    setTags(tags);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      return;
    }

    startTransition(async () => {
      try {
        // Upload image first if there's a new image
        let imageId: string | undefined;
        if (image && token) {
          setUploadProgress(true);
          try {
            const result = await uploadImage(image, token);
            imageId = result.imageId;
          } catch {
            toast.error('Nepodařilo se nahrát obrázek');
            setUploadProgress(false);
            return;
          }
          setUploadProgress(false);
        }

        const recipeInput: RecipeInput = {
          title,
          preparationTime: preparationTime || null,
          servingCount: servingCount || null,
          sideDish: sideDish || null,
          directions: directions || null,
          ingredients: ingredients.length > 0 ? ingredients : null,
          tags: tags?.length ? tags : null,
        };

        // Create FormData with recipe data and optional imageId
        const formData = new FormData();
        formData.set('recipeData', JSON.stringify(recipeInput));
        if (imageId) {
          formData.set('imageId', imageId);
        }

        let result: RecipeFormState;
        if (initialRecipe) {
          result = await updateRecipeAction(initialRecipe.id, {}, formData);
        } else {
          result = await createRecipeAction({}, formData);
        }

        if (result.error) {
          if (result.error.includes('existuje')) {
            toast.warning('Zadaný název již existuje');
          } else {
            toast.error(result.error);
          }
        } else if (result.success && result.recipeSlug) {
          toast.success('Recept úspěšně uložen');
          setChanged(false);
          router.push(`/recept/${result.recipeSlug}`);
        }
      } catch {
        toast.error('Recept se nepodařilo uložit');
      }
    });
  }

  return (
    <Layout>
      <RecipeEdit
        changed={changed}
        directions={directions}
        imageUrl={initialRecipe?.imageThumbWebPUrl ?? undefined}
        ingredientOptions={options.ingredients}
        ingredients={ingredients}
        isNew={isNew}
        isSaving={isSaving}
        preparationTime={preparationTime}
        servingCount={servingCount}
        sideDish={sideDish}
        sideDishOptions={options.sideDishes}
        tagOptions={options.tags}
        tags={tags}
        title={title}
        onAddGroup={handleAddGroup}
        onAddIngredient={handleAddIngredient}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onRemoveIngredient={handleRemoveIngredient}
        onSortIngredient={handleSortIngredient}
        onSubmit={handleSubmit}
        onTagsChange={handleTagsChange}
      />
    </Layout>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  RecipeFormState,
  createRecipeAction,
  updateRecipeAction,
} from '@/app/actions/recipe';
import { Layout } from '@/components/Layout';
import { RecipeEdit } from '@/components/RecipeEdit/RecipeEdit';
import { INSTANT_POT_TAG, INSTANT_POT_TAG_SLUG } from '@/const';
import {
  Ingredient,
  RecipeBaseFragment,
  RecipeEditQuery,
} from '@/generated/graphql';
import { uploadImage } from '@/lib/image-upload';
import { useAuth } from '@/lib/use-auth';
import { User } from '@/types/user';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

const initialState: RecipeFormState = {};

type Props = {
  recipe?: NonNullable<RecipeEditQuery['recipe']>;
  options: {
    ingredients: string[];
    sideDishes: string[];
    tags: string[];
  };
  recipes: RecipeBaseFragment[];
  user: User;
};

export function RecipeEditPage({
  recipe: initialRecipe,
  options,
  recipes,
  user,
}: Props) {
  const searchParams = useSearchParams();
  const [token] = useAuth();

  const isInstantPotNewRecipe = searchParams.has(INSTANT_POT_TAG_SLUG);
  const isNew = !initialRecipe;

  // Bind update action with recipeId if editing
  const boundAction = isNew
    ? createRecipeAction
    : updateRecipeAction.bind(null, initialRecipe.id);

  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );

  // Local state for interactive features and tracking
  const [changed, setChanged] = useState(false);
  const [imageId, setImageId] = useState<string>();
  const [uploadProgress, setUploadProgress] = useState(false);

  // Ingredients require local state for drag-drop reordering
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

  // Tags require local state for checkbox interactivity
  const [tags, setTags] = useState<string[]>(
    initialRecipe?.tags ?? (isInstantPotNewRecipe ? [INSTANT_POT_TAG] : []),
  );

  const isSaving = isPending || uploadProgress;

  // Handle errors from Conform submission
  useEffect(() => {
    if (state.status === 'error' && state.error) {
      // Form-level errors (stored under empty key)
      const formErrors = state.error[''];
      if (formErrors?.[0]) {
        if (formErrors[0].includes('existuje')) {
          toast.warning('Zadaný název již existuje');
        } else {
          toast.error(formErrors[0]);
        }
        return;
      }
      // Field-level errors
      const firstError = Object.entries(state.error).find(
        ([key, errors]) => key !== '' && errors && errors.length > 0,
      );
      if (firstError) {
        const [field, errors] = firstError;
        if (errors?.[0]) {
          toast.error(`${field}: ${errors[0]}`);
        }
      }
    }
  }, [state.status, state.error]);

  // Unsaved changes warning
  useEffect(() => {
    if (changed) {
      window.onbeforeunload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        return confirmMsg;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [changed]);

  // Upload image immediately on selection
  async function handleImageChange(file: File) {
    setChanged(true);

    if (token) {
      setUploadProgress(true);
      try {
        const result = await uploadImage(file, token);
        setImageId(result.imageId);
      } catch {
        toast.error('Nepodařilo se nahrát obrázek');
      } finally {
        setUploadProgress(false);
      }
    }
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

  function handleTagsChange(newTags: string[]) {
    setChanged(true);
    setTags(newTags);
  }

  function handleChange() {
    setChanged(true);
  }

  // Get default values from initialRecipe (form state is preserved on error via useActionState)
  const defaultValues = {
    title: initialRecipe?.title ?? '',
    directions: initialRecipe?.directions ?? '',
    preparationTime: initialRecipe?.preparationTime?.toString() ?? '',
    servingCount: initialRecipe?.servingCount?.toString() ?? '',
    sideDish: initialRecipe?.sideDish ?? '',
  };

  return (
    <Layout recipes={recipes} user={user}>
      <RecipeEdit
        defaultValues={defaultValues}
        formAction={formAction}
        imageId={imageId}
        imageUrl={initialRecipe?.imageThumbWebPUrl ?? undefined}
        ingredientOptions={options.ingredients}
        ingredients={ingredients}
        isNew={isNew}
        isSaving={isSaving}
        sideDishOptions={options.sideDishes}
        tagOptions={options.tags}
        tags={tags}
        onAddGroup={handleAddGroup}
        onAddIngredient={handleAddIngredient}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onRemoveIngredient={handleRemoveIngredient}
        onSortIngredient={handleSortIngredient}
        onTagsChange={handleTagsChange}
      />
    </Layout>
  );
}

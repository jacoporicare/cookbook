'use client';

import { ApolloError } from '@apollo/client';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import RecipeEdit, { RecipeEditFields } from '@/components/RecipeEdit/RecipeEdit';
import { INSTANT_POT_TAG, INSTANT_POT_TAG_SLUG } from '@/const';
import {
  RecipeListQuery,
  RecipeListDocument,
  CreateRecipeMutation,
  UpdateRecipeMutation,
  Ingredient,
  RecipeEditQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  RecipeInput,
} from '@/generated/graphql';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

function isCreateMutation(
  data: CreateRecipeMutation | UpdateRecipeMutation,
): data is CreateRecipeMutation {
  return Boolean((data as CreateRecipeMutation).createRecipe);
}

type Props = {
  recipe?: NonNullable<RecipeEditQuery['recipe']>;
  options: {
    ingredients: string[];
    sideDishes: string[];
    tags: string[];
  };
};

export default function RecipeEditPage({ recipe: initialRecipe, options }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isInstantPotNewRecipe = searchParams.has(INSTANT_POT_TAG_SLUG);
  const isNew = !initialRecipe;

  const [snackbar, setSnackbar] = useState<[AlertColor, string]>();
  const [changed, setChanged] = useState(false);
  const [image, setImage] = useState<File>();

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
  const [ingredients, setIngredients] = useState<Omit<Ingredient, '_id' | 'id'>[]>(
    initialRecipe?.ingredients?.map(i => ({
      name: i.name,
      amount: i.amount,
      amountUnit: i.amountUnit,
      isGroup: i.isGroup,
    })) ?? [],
  );
  const [tags, setTags] = useState<string[]>(
    initialRecipe?.tags ?? (isInstantPotNewRecipe ? [INSTANT_POT_TAG] : []),
  );

  // Keep mutations for file upload support
  const [createRecipe, { loading: creating }] = useCreateRecipeMutation({
    onCompleted: handleSave,
    onError: handleError,
    update: (store, result) => {
      if (!result.data?.createRecipe) {
        return;
      }

      const cacheData = store.readQuery<RecipeListQuery>({ query: RecipeListDocument });

      if (!cacheData) {
        return;
      }

      const data = {
        ...cacheData,
        recipes: [...cacheData.recipes, result.data.createRecipe],
      };

      store.writeQuery({ query: RecipeListDocument, data });
    },
  });
  const [updateRecipe, { loading: updating }] = useUpdateRecipeMutation({
    onCompleted: handleSave,
    onError: handleError,
  });
  const isSaving = creating || updating;

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

  function handleAddIngredient(name: string, amount?: number, amountUnit?: string) {
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

  function handleSortIngredient({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
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

    const recipeInput: RecipeInput = {
      title,
      preparationTime: preparationTime || null,
      servingCount: servingCount || null,
      sideDish: sideDish || null,
      directions: directions || null,
      ingredients: ingredients.length > 0 ? ingredients : null,
      tags: tags?.length ? tags : null,
    };

    if (initialRecipe) {
      updateRecipe({
        variables: {
          id: initialRecipe.id,
          recipe: recipeInput,
          image,
        },
      });
    } else {
      createRecipe({
        variables: {
          recipe: recipeInput,
          image,
        },
      });
    }
  }

  function handleSave(data: CreateRecipeMutation | UpdateRecipeMutation) {
    const recipe = isCreateMutation(data) ? data.createRecipe : data.updateRecipe;

    setSnackbar(['success', 'Recept úspěšně uložen']);
    router.push(`/recept/${recipe.slug}`);
  }

  function handleError(error: ApolloError) {
    if (error.graphQLErrors[0] && error.graphQLErrors[0].message.startsWith('EEXIST')) {
      setSnackbar(['warning', 'Zadaný název již existuje']);
    } else {
      setSnackbar(['error', 'Recept se nepodařilo uložit']);
    }
  }

  return (
    <>
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
      <Snackbar autoHideDuration={5000} open={!!snackbar} onClose={() => setSnackbar(undefined)}>
        <Alert severity={snackbar?.[0]} onClose={() => setSnackbar(undefined)}>
          {snackbar?.[1]}
        </Alert>
      </Snackbar>
    </>
  );
}

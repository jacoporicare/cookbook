import { ApolloError } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { SortEnd } from 'react-sortable-hoc';

import { withApollo } from '../../../apollo';
import { withAuth } from '../../../auth';
import Layout from '../../../components/Layout';
import RecipeEdit, { RecipeEditFields } from '../../../components/RecipeEdit/RecipeEdit';
import DocumentTitle from '../../../components/common/DocumentTitle';
import SpinnerIf from '../../../components/common/SpinnerIf';
import {
  RecipeListQuery,
  RecipeListDocument,
  CreateRecipeMutation,
  UpdateRecipeMutation,
  Ingredient,
  useRecipeEditQuery,
  useRecipeEditOptionsQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  RecipeInput,
} from '../../../generated/graphql';
import useSupportsWebP from '../../../hooks/useSupportsWebP';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

function isCreateMutation(
  data: CreateRecipeMutation | UpdateRecipeMutation,
): data is CreateRecipeMutation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Boolean((data as any).createRecipe);
}

function RecipeEditPage() {
  const router = useRouter();
  const supportsWebP = useSupportsWebP();

  const [snackbar, setSnackbar] = useState<[Color, string]>();

  const [changed, setChanged] = useState(false);
  const [image, setImage] = useState<File>();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [preparationTime, setPreparationTime] = useState<number>();
  const [servingCount, setServingCount] = useState<number>();
  const [ingredients, setIngredients] = useState<Omit<Ingredient, '_id' | 'id'>[]>([]);
  const [tags, setTags] = useState<string[]>();

  const slug = router.query.slug?.toString();

  const { data, loading } = useRecipeEditQuery({
    variables: { slug: slug! },
    skip: !slug,
  });
  const { data: dataOptions } = useRecipeEditOptionsQuery({
    fetchPolicy: 'cache-and-network',
  });
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
  const editedRecipe = data && data.recipe;

  if (editedRecipe && editedRecipe.id !== id) {
    setId(editedRecipe.id);
    setTitle(editedRecipe.title);
    setSideDish(editedRecipe.sideDish || '');
    setTags(editedRecipe.tags || []);
    setDirections(editedRecipe.directions || '');
    setPreparationTime(editedRecipe.preparationTime ?? undefined);
    setServingCount(editedRecipe.servingCount ?? undefined);
    setIngredients(
      // To remove __typename
      (editedRecipe.ingredients || []).map(i => ({
        name: i.name,
        amount: i.amount,
        amountUnit: i.amountUnit,
        isGroup: i.isGroup,
      })),
    );
  }

  useEffect(() => {
    if (changed) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onbeforeunload = (e: any) => {
        e.returnValue = confirmMsg;

        return confirmMsg;
      };
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onbeforeunload = undefined;
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

  function handleSortIngredient({ oldIndex, newIndex }: SortEnd) {
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

    if (editedRecipe) {
      updateRecipe({
        variables: {
          id: editedRecipe.id,
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
    router.push('/recept/[slug]', `/recept/${recipe.slug}`);
  }

  function handleError(error: ApolloError) {
    if (error.graphQLErrors[0] && error.graphQLErrors[0].message.startsWith('EEXIST')) {
      setSnackbar(['warning', 'Zadaný název již existuje']);
    } else {
      setSnackbar(['error', 'Recept se nepodařilo uložit']);
    }
  }

  if (slug && !editedRecipe) {
    return (
      <Layout>
        <SpinnerIf spinner={loading}>
          <Alert elevation={1} severity="error">
            Recept nenalezen.
          </Alert>
        </SpinnerIf>
      </Layout>
    );
  }

  return (
    <>
      <DocumentTitle title={!title && !slug ? 'Nový recept' : title} />
      <Layout>
        <RecipeEdit
          changed={changed}
          directions={directions}
          imageUrl={
            (supportsWebP ? editedRecipe?.imageThumbWebPUrl : editedRecipe?.imageThumbUrl) ??
            undefined
          }
          ingredientOptions={dataOptions?.ingredients ?? []}
          ingredients={ingredients}
          isNew={!slug}
          isSaving={isSaving}
          preparationTime={preparationTime}
          servingCount={servingCount}
          sideDish={sideDish}
          sideDishOptions={dataOptions?.sideDishes ?? []}
          tagOptions={dataOptions?.tags ?? []}
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

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeEditPage);

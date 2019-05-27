import { RouteComponentProps } from '@reach/router';
import { ApolloError } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { notify } from 'react-notify-toast';
import { SortEnd } from 'react-sortable-hoc';

import DocumentTitle from '../components/common/DocumentTitle';
import SpinnerIf from '../components/common/SpinnerIf';
import { DangerAlert } from '../components/elements';
import RecipeEdit from '../components/RecipeEdit/RecipeEdit';
import { AutosuggestChangeEventHandler, Ingredient, RecipeDetail } from '../types';
import { getImageUrl } from '../utils';
import { recipeDetailFragment } from './RecipeDetailPage';
import { RecipeListQueryData, RECIPE_LIST_QUERY } from './RecipeListPage';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

type Params = {
  slug?: string;
};

type Props = RouteComponentProps<Params>;

export const RECIPE_EDIT_QUERY = gql`
  query RecipeEdit($slug: String) {
    recipe(slug: $slug) {
      ...recipeDetail
    }
    ingredients
    sideDishes
  }

  ${recipeDetailFragment}
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($recipe: RecipeInput!, $image: Upload) {
    createRecipe(recipe: $recipe, image: $image) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!, $image: Upload) {
    updateRecipe(id: $id, recipe: $recipe, image: $image) {
      ...recipeDetail
    }
  }

  ${recipeDetailFragment}
`;

export type RecipeEditQueryData = {
  recipe?: RecipeDetail;
  ingredients: string[];
  sideDishes: [];
};

export type CreateRecipeMutationData = {
  createRecipe?: RecipeDetail;
};

export type UpdateRecipeMutationData = {
  updateRecipe?: RecipeDetail;
};

function isCreateMutation(
  data: CreateRecipeMutationData | UpdateRecipeMutationData,
): data is CreateRecipeMutationData {
  return Boolean((data as any).createRecipe);
}

function RecipeEditPage(props: Props) {
  const [changed, setChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [preparationTime, setPreparationTime] = useState<number | undefined>();
  const [servingCount, setServingCount] = useState<number | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const { data, loading } = useQuery<RecipeEditQueryData>(RECIPE_EDIT_QUERY, {
    variables: { slug: props.slug },
  });
  const createRecipe = useMutation<CreateRecipeMutationData>(CREATE_RECIPE_MUTATION, {
    update: (store, result) => {
      if (!result.data || !result.data.createRecipe) {
        return;
      }

      const data = store.readQuery<RecipeListQueryData>({ query: RECIPE_LIST_QUERY });

      if (!data) {
        return;
      }

      data.recipes.push(result.data.createRecipe);

      store.writeQuery({ query: RECIPE_LIST_QUERY, data });
    },
  });
  const updateRecipe = useMutation<UpdateRecipeMutationData>(UPDATE_RECIPE_MUTATION);

  const editedRecipe = data && data.recipe;

  if (editedRecipe && editedRecipe._id !== id) {
    setId(editedRecipe._id);
    setTitle(editedRecipe.title);
    setSideDish(editedRecipe.sideDish || '');
    setDirections(editedRecipe.directions || '');
    setPreparationTime(editedRecipe.preparationTime);
    setServingCount(editedRecipe.servingCount);
    setIngredients(
      // To remove _id and __typename
      editedRecipe.ingredients.map(i => ({
        name: i.name,
        amount: i.amount,
        amountUnit: i.amountUnit,
        isGroup: i.isGroup,
      })),
    );
  }

  useEffect(() => {
    if (changed) {
      (window as any).onbeforeunload = (e: any) => {
        e.returnValue = confirmMsg;
        return confirmMsg;
      };
    }

    return () => {
      (window as any).onbeforeunload = undefined;
    };
  }, [changed]);

  const handleChange: AutosuggestChangeEventHandler = (event, selectEvent, targetName) => {
    const { name, value } = event.currentTarget;
    const key = targetName || name;
    const rawValue = selectEvent ? selectEvent.newValue : value;

    switch (key) {
      case 'title':
        setTitle(rawValue);
        break;

      case 'sideDish':
        setSideDish(rawValue);
        break;

      case 'directions':
        setDirections(rawValue);
        break;

      case 'preparationTime': {
        const parsed = Number.parseInt(rawValue, 10);
        setPreparationTime(Number.isNaN(parsed) ? undefined : parsed);
        break;
      }

      case 'servingCount': {
        const parsed = Number.parseInt(rawValue, 10);
        setServingCount(Number.isNaN(parsed) ? undefined : parsed);
        break;
      }

      default:
        break;
    }

    setChanged(true);
  };

  function handleAddIngredient(name: string, amount?: number, amountUnit?: string) {
    setChanged(true);
    setIngredients([
      ...ingredients,
      {
        name,
        amount,
        amountUnit,
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      return;
    }

    setIsSaving(true);

    const recipeInput = {
      title,
      preparationTime: preparationTime || null,
      servingCount: servingCount || null,
      sideDish: sideDish || null,
      directions: directions || null,
      ingredients,
    };

    if (editedRecipe) {
      updateRecipe({
        variables: {
          id: editedRecipe._id,
          recipe: recipeInput,
          image,
        },
      })
        .then(handleSave)
        .catch(handleError);
    } else {
      createRecipe({
        variables: {
          recipe: recipeInput,
          image,
        },
      })
        .then(handleSave)
        .catch(handleError);
    }
  }

  function handleSave(
    fetchResult: FetchResult<CreateRecipeMutationData> | FetchResult<UpdateRecipeMutationData>,
  ) {
    setIsSaving(false);

    const recipe =
      fetchResult.data &&
      (isCreateMutation(fetchResult.data)
        ? fetchResult.data.createRecipe
        : fetchResult.data.updateRecipe);

    if (!recipe) {
      return;
    }

    notify.show('Recept úspěšně uložen', 'success');
    props.navigate && props.navigate(`/recept/${recipe.slug}`);
  }

  function handleError(error: ApolloError) {
    setIsSaving(false);

    if (error.graphQLErrors[0] && error.graphQLErrors[0].message.startsWith('E11000')) {
      notify.show('Zadaný název již existuje', 'warning');
    } else {
      notify.show('Recept se nepodařilo uložit', 'error');
    }
  }

  if (props.slug && !editedRecipe) {
    return (
      <SpinnerIf spinner={loading}>
        <DangerAlert>Recept nenalezen.</DangerAlert>
      </SpinnerIf>
    );
  }

  const imageUrl =
    props.slug && editedRecipe && editedRecipe.hasImage
      ? getImageUrl(props.slug, editedRecipe.lastModifiedDate)
      : undefined;

  return (
    <>
      <DocumentTitle title={!title && !props.slug ? 'Nový recept' : title} />
      <RecipeEdit
        changed={changed}
        directions={directions}
        imageUrl={imageUrl}
        ingredientOptions={(data && data.ingredients) || []}
        ingredients={ingredients}
        isNew={!props.slug}
        isSaving={isSaving}
        onAddGroup={handleAddGroup}
        onAddIngredient={handleAddIngredient}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onRemoveIngredient={handleRemoveIngredient}
        onSortIngredient={handleSortIngredient}
        onSubmit={handleSubmit}
        preparationTime={preparationTime}
        servingCount={servingCount}
        sideDish={sideDish}
        sideDishOptions={(data && data.sideDishes) || []}
        slug={props.slug}
        title={title}
      />
    </>
  );
}

export default RecipeEditPage;

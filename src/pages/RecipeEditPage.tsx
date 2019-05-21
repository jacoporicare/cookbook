import { RouteComponentProps } from '@reach/router';
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
import { recipeBaseFragment } from '../components/RecipeList/RecipeListItem';
import { AutosuggestChangeEventHandler, Ingredient, RecipeDetail } from '../types';
import { getImageUrl } from '../utils';
import { useAuth } from '../AuthContext';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

type Params = {
  slug?: string;
};

type Props = RouteComponentProps<Params>;

const QUERY = gql`
  query RecipeEdit($slug: String) {
    recipe(slug: $slug) {
      ...recipeBase
      directions
      servingCount
      ingredients {
        _id
        name
        amount
        amountUnit
        isGroup
      }
    }
    ingredients
    sideDishes
  }

  ${recipeBaseFragment}
`;

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($recipe: RecipeInput!) {
    createRecipe(recipe: $recipe) {
      slug
    }
  }
`;

const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!) {
    updateRecipe(id: $id, recipe: $recipe) {
      slug
    }
  }
`;

type QueryData = {
  recipe?: RecipeDetail;
  ingredients: string[];
  sideDishes: [];
};

type CreateRecipeMutationData = {
  createRecipe?: RecipeDetail;
};

type UpdateRecipeMutationData = {
  updateRecipe?: RecipeDetail;
};

function isCreateMutation(
  data: CreateRecipeMutationData | UpdateRecipeMutationData,
): data is CreateRecipeMutationData {
  return Boolean((data as any).createRecipe);
}

function RecipeEditPage(props: Props) {
  const [token] = useAuth();
  const [changed, setChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [newImage, setNewImage] = useState<ArrayBuffer | undefined>(undefined);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [preparationTime, setPreparationTime] = useState<number | undefined>();
  const [servingCount, setServingCount] = useState<number | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const { data, loading } = useQuery<QueryData>(QUERY, {
    variables: { slug: props.slug },
  });
  const createRecipe = useMutation<CreateRecipeMutationData>(CREATE_RECIPE_MUTATION);
  const updateRecipe = useMutation<UpdateRecipeMutationData>(UPDATE_RECIPE_MUTATION);

  const editedRecipe = data && data.recipe;

  if (editedRecipe && editedRecipe._id !== id) {
    setId(editedRecipe._id);
    setTitle(editedRecipe.title);
    setSideDish(editedRecipe.sideDish || '');
    setDirections(editedRecipe.directions || '');
    setPreparationTime(editedRecipe.preparationTime);
    setServingCount(editedRecipe.servingCount);
    setIngredients(editedRecipe.ingredients);
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

  function handleImageChange(data: ArrayBuffer) {
    setChanged(true);
    setNewImage(data);
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
        },
      }).then(handleSave);
    } else {
      createRecipe({
        variables: {
          recipe: recipeInput,
        },
      }).then(handleSave);
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

    const { _id, slug } = recipe;

    if (!newImage) {
      completeSave(slug);
      return;
    }

    setIsSavingImage(true);

    fetch(`/api/recipes/${_id}/image`, {
      method: 'POST',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        'content-type': 'application/octet-stream',
      },
      body: newImage,
    })
      .then(() => completeSave(slug))
      .catch(() => completeSave(slug));
  }

  function completeSave(slug: string) {
    notify.show('Recept úspěšně uložen', 'success');
    props.navigate && props.navigate(`/recept/${slug}`);
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
        isSaving={isSaving || isSavingImage}
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

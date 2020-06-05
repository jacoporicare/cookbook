import { ApolloError } from 'apollo-client';
import flow from 'lodash.flow';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { notify } from 'react-notify-toast';
import { SortEnd } from 'react-sortable-hoc';

import { withApollo } from '../../../apollo';
import { withAuth } from '../../../auth';
import Layout from '../../../components/Layout';
import RecipeEdit from '../../../components/RecipeEdit/RecipeEdit';
import DocumentTitle from '../../../components/common/DocumentTitle';
import SpinnerIf from '../../../components/common/SpinnerIf';
import { DangerAlert } from '../../../components/elements';
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
import { AutosuggestChangeEventHandler } from '../../../types';

const confirmMsg = 'Neuložené změny. Opravdu opustit tuto stránku?';

function isCreateMutation(
  data: CreateRecipeMutation | UpdateRecipeMutation,
): data is CreateRecipeMutation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Boolean((data as any).createRecipe);
}

function RecipeEditPage() {
  const router = useRouter();
  const [changed, setChanged] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [sideDish, setSideDish] = useState('');
  const [directions, setDirections] = useState('');
  const [preparationTime, setPreparationTime] = useState<number | null>(null);
  const [servingCount, setServingCount] = useState<number | null>(null);
  const [ingredients, setIngredients] = useState<Omit<Ingredient, '_id'>[]>([]);
  const [tags, setTags] = useState<string[] | null>(null);

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
      if (!result.data || !result.data.createRecipe) {
        return;
      }

      const data = store.readQuery<RecipeListQuery>({ query: RecipeListDocument });

      if (!data) {
        return;
      }

      data.recipes.push(result.data.createRecipe);

      store.writeQuery({ query: RecipeListDocument, data });
    },
  });
  const [updateRecipe, { loading: updating }] = useUpdateRecipeMutation({
    onCompleted: handleSave,
    onError: handleError,
  });
  const isSaving = creating || updating;
  const editedRecipe = data && data.recipe;

  if (editedRecipe && editedRecipe._id !== id) {
    setId(editedRecipe._id);
    setTitle(editedRecipe.title);
    setSideDish(editedRecipe.sideDish || '');
    setTags(editedRecipe.tags || []);
    setDirections(editedRecipe.directions || '');
    setPreparationTime(editedRecipe.preparationTime);
    setServingCount(editedRecipe.servingCount);
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
        setPreparationTime(Number.isNaN(parsed) ? null : parsed);
        break;
      }

      case 'servingCount': {
        const parsed = Number.parseInt(rawValue, 10);
        setServingCount(Number.isNaN(parsed) ? null : parsed);
        break;
      }

      default:
        break;
    }

    setChanged(true);
  };

  function handleAddIngredient(name: string, amount: number | null, amountUnit: string | null) {
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
      image: null,
    };

    if (editedRecipe) {
      updateRecipe({
        variables: {
          id: editedRecipe._id,
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

    if (!recipe) {
      return;
    }

    notify.show('Recept úspěšně uložen', 'success');
    router.push('/recept/[slug]', `/recept/${recipe.slug}`);
  }

  function handleError(error: ApolloError) {
    if (error.graphQLErrors[0] && error.graphQLErrors[0].message.startsWith('EEXIST')) {
      notify.show('Zadaný název již existuje', 'warning');
    } else {
      notify.show('Recept se nepodařilo uložit', 'error');
    }
  }

  if (slug && !editedRecipe) {
    return (
      <Layout>
        <SpinnerIf spinner={loading}>
          <DangerAlert>Recept nenalezen.</DangerAlert>
        </SpinnerIf>
      </Layout>
    );
  }

  return (
    <Layout>
      <DocumentTitle title={!title && !slug ? 'Nový recept' : title} />
      <RecipeEdit
        changed={changed}
        directions={directions}
        imageUrl={editedRecipe?.image?.thumbUrl}
        ingredientOptions={dataOptions?.ingredients ?? []}
        ingredients={ingredients}
        isNew={!slug}
        isSaving={isSaving}
        preparationTime={preparationTime}
        servingCount={servingCount}
        sideDish={sideDish}
        sideDishOptions={dataOptions?.sideDishes ?? []}
        slug={slug}
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
  );
}

const hocs = flow(withAuth(), withApollo());

export default hocs(RecipeEditPage);

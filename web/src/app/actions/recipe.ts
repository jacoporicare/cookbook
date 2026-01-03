'use server';

import type { SubmissionResult } from '@conform-to/dom';
import { parseWithZod } from '@conform-to/zod/v4';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import {
  CreateRecipeDocument,
  DeleteRecipeDocument,
  ImportRecipeDocument,
  RecipeInput,
  UpdateRecipeDocument,
} from '@/generated/graphql';
import { getClient } from '@/lib/apollo-client';
import { getCurrentUser } from '@/lib/auth-server';

// Schemas
const ingredientSchema = z.object({
  name: z.string().min(1),
  amount: z.number({ error: 'Množství musí být číslo' }).nullable().optional(),
  amountUnit: z.string().nullable().optional(),
  isGroup: z.stringbool().optional().default(false),
});

const sousVideOptionSchema = z.object({
  temperature: z.number({ error: 'Teplota musí být číslo' }),
  time: z.string().min(1, { error: 'Čas je povinný' }),
  label: z.string().min(1, { error: 'Popisek je povinný' }),
});

const recipeSchema = z.object({
  title: z.string().min(1, { error: 'Název receptu je povinný' }),
  directions: z.string().nullable().optional(),
  preparationTime: z
    .number({ error: 'Doba přípravy musí být číslo' })
    .nullable()
    .optional(),
  servingCount: z
    .number({ error: 'Počet porcí musí být číslo' })
    .nullable()
    .optional(),
  sideDish: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  ingredients: z
    .array(ingredientSchema, { error: 'Neplatný formát ingrediencí' })
    .nullable()
    .optional(),
  sousVideOptions: z
    .array(sousVideOptionSchema, {
      error: 'Neplatný formát sous-vide možností',
    })
    .nullable()
    .optional(),
  imageId: z.string().nullable().optional(),
});

const importRecipeSchema = z.object({
  url: z.url({ error: 'Zadejte platnou URL adresu' }),
});

// Types
export type DeleteRecipeState = {
  success?: boolean;
  error?: string;
};

export type ImportRecipeState = SubmissionResult<string[]> & {
  recipeSlug?: string;
};

export type RecipeFormState = SubmissionResult<string[]> & {
  recipeSlug?: string;
};

// Actions
export async function deleteRecipeAction(
  recipeId: string,
): Promise<DeleteRecipeState> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    return { error: 'Nejste přihlášen' };
  }

  try {
    await client.mutate({
      mutation: DeleteRecipeDocument,
      variables: { id: recipeId },
    });

    revalidatePath('/');

    return { success: true };
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    return { error: 'Nepodařilo se smazat recept' };
  }
}

export async function importRecipeAction(
  _prevState: ImportRecipeState,
  formData: FormData,
): Promise<ImportRecipeState> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    return { status: 'error', error: { '': ['Nejste přihlášen'] } };
  }

  const submission = parseWithZod(formData, { schema: importRecipeSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const { data } = await client.mutate({
      mutation: ImportRecipeDocument,
      variables: { url: submission.value.url },
    });

    if (!data?.importRecipe) {
      return submission.reply({
        formErrors: ['Nepodařilo se importovat recept'],
      });
    }

    revalidatePath('/');

    return {
      status: 'success',
      recipeSlug: data.importRecipe.slug,
    };
  } catch {
    return submission.reply({
      formErrors: ['Nepodařilo se importovat recept z uvedené URL'],
    });
  }
}

export async function createRecipeAction(
  _prevState: RecipeFormState,
  formData: FormData,
): Promise<RecipeFormState> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    return { status: 'error', error: { '': ['Nejste přihlášen'] } };
  }

  const submission = parseWithZod(formData, { schema: recipeSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { imageId, ...recipeData } = submission.value;

  try {
    const { data } = await client.mutate({
      mutation: CreateRecipeDocument,
      variables: {
        recipe: recipeData as RecipeInput,
        imageId: imageId || null,
      },
    });

    if (!data?.createRecipe) {
      return submission.reply({
        formErrors: ['Nepodařilo se vytvořit recept'],
      });
    }

    revalidatePath('/');

    return { ...submission.reply(), recipeSlug: data.createRecipe.slug };
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    if (e instanceof Error && e.message.includes('EEXIST')) {
      return submission.reply({
        formErrors: ['Recept s tímto názvem již existuje'],
      });
    }
    return submission.reply({ formErrors: ['Nepodařilo se vytvořit recept'] });
  }
}

export async function updateRecipeAction(
  recipeId: string,
  _prevState: RecipeFormState,
  formData: FormData,
): Promise<RecipeFormState> {
  const client = await getClient();
  const user = await getCurrentUser(client);
  if (!user) {
    return { status: 'error', error: { '': ['Nejste přihlášen'] } };
  }

  const submission = parseWithZod(formData, { schema: recipeSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const { imageId, ...recipeData } = submission.value;

  try {
    const { data } = await client.mutate({
      mutation: UpdateRecipeDocument,
      variables: {
        id: recipeId,
        recipe: recipeData as RecipeInput,
        imageId: imageId || null,
      },
    });

    if (!data?.updateRecipe) {
      return submission.reply({
        formErrors: ['Nepodařilo se aktualizovat recept'],
      });
    }

    revalidatePath('/');
    revalidatePath(`/recept/${data.updateRecipe.slug}`);

    return { ...submission.reply(), recipeSlug: data.updateRecipe.slug };
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    if (e instanceof Error && e.message.includes('EEXIST')) {
      return submission.reply({
        formErrors: ['Recept s tímto názvem již existuje'],
      });
    }
    return submission.reply({
      formErrors: ['Nepodařilo se aktualizovat recept'],
    });
  }
}

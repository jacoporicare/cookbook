'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
  amount: z.number().nullable().optional(),
  amountUnit: z.string().nullable().optional(),
  isGroup: z.boolean().optional(),
});

const recipeSchema = z.object({
  title: z.string().min(1, 'Název receptu je povinný'),
  directions: z.string().nullable().optional(),
  preparationTime: z.number().nullable().optional(),
  servingCount: z.number().nullable().optional(),
  sideDish: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  ingredients: z.array(ingredientSchema).optional(),
});

const importRecipeSchema = z.object({
  url: z.string().url('Zadejte platnou URL adresu'),
});

// Types
export type DeleteRecipeState = {
  success?: boolean;
  error?: string;
};

export type ImportRecipeState = {
  success?: boolean;
  error?: string;
  fieldErrors?: { url?: string[] };
  recipeSlug?: string;
};

export type RecipeFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  recipeSlug?: string;
};

// Actions
export async function deleteRecipeAction(
  recipeId: string,
): Promise<DeleteRecipeState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Nejste přihlášen' };
  }

  try {
    const client = await getClient();
    await client.mutate({
      mutation: DeleteRecipeDocument,
      variables: { id: recipeId },
    });

    revalidatePath('/');
    redirect('/');
  } catch (e) {
    if (e instanceof Error && e.message === 'NEXT_REDIRECT') {
      throw e;
    }
    return { error: 'Nepodařilo se smazat recept' };
  }
}

export async function importRecipeAction(
  prevState: ImportRecipeState,
  formData: FormData,
): Promise<ImportRecipeState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Nejste přihlášen' };
  }

  const rawData = {
    url: formData.get('url') as string,
  };

  const validated = importRecipeSchema.safeParse(rawData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: ImportRecipeDocument,
      variables: { url: validated.data.url },
    });

    if (!data?.importRecipe) {
      return { error: 'Nepodařilo se importovat recept' };
    }

    revalidatePath('/');
    return {
      success: true,
      recipeSlug: data.importRecipe.slug,
    };
  } catch {
    return { error: 'Nepodařilo se importovat recept z uvedené URL' };
  }
}

export async function createRecipeAction(
  prevState: RecipeFormState,
  formData: FormData,
): Promise<RecipeFormState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Nejste přihlášen' };
  }

  // Parse recipe data from FormData
  const recipeDataJson = formData.get('recipeData') as string;
  const imageId = formData.get('imageId') as string | null;
  let recipeData: RecipeInput;

  try {
    recipeData = JSON.parse(recipeDataJson);
  } catch {
    return { error: 'Neplatná data receptu' };
  }

  const validated = recipeSchema.safeParse(recipeData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: CreateRecipeDocument,
      variables: {
        recipe: validated.data as RecipeInput,
        imageId: imageId || null,
      },
    });

    if (!data?.createRecipe) {
      return { error: 'Nepodařilo se vytvořit recept' };
    }

    revalidatePath('/');
    return {
      success: true,
      recipeSlug: data.createRecipe.slug,
    };
  } catch (e) {
    if (e instanceof Error && e.message.includes('EEXIST')) {
      return { error: 'Recept s tímto názvem již existuje' };
    }
    return { error: 'Nepodařilo se vytvořit recept' };
  }
}

export async function updateRecipeAction(
  recipeId: string,
  prevState: RecipeFormState,
  formData: FormData,
): Promise<RecipeFormState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: 'Nejste přihlášen' };
  }

  // Parse recipe data from FormData
  const recipeDataJson = formData.get('recipeData') as string;
  const imageId = formData.get('imageId') as string | null;
  let recipeData: RecipeInput;

  try {
    recipeData = JSON.parse(recipeDataJson);
  } catch {
    return { error: 'Neplatná data receptu' };
  }

  const validated = recipeSchema.safeParse(recipeData);
  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  try {
    const client = await getClient();
    const { data } = await client.mutate({
      mutation: UpdateRecipeDocument,
      variables: {
        id: recipeId,
        recipe: validated.data as RecipeInput,
        imageId: imageId || null,
      },
    });

    if (!data?.updateRecipe) {
      return { error: 'Nepodařilo se aktualizovat recept' };
    }

    revalidatePath('/');
    revalidatePath(`/recept/${data.updateRecipe.slug}`);
    return {
      success: true,
      recipeSlug: data.updateRecipe.slug,
    };
  } catch (e) {
    if (e instanceof Error && e.message.includes('EEXIST')) {
      return { error: 'Recept s tímto názvem již existuje' };
    }
    return { error: 'Nepodařilo se aktualizovat recept' };
  }
}

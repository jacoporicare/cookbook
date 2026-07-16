import { randomUUID } from 'crypto';

import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';

import { authenticated, signToken } from './auth';
import { messaging } from './firebase';
import { Resolvers } from './generated/graphql';
import { isAllowedContentType, promoteStagingImage } from './imageProcessing';
import logger from './logger';
import {
  mapToRecipeDbObject,
  mapToRecipeGqlObject,
  mapToUserDbObject,
  mapToUserGqlObject,
} from './mapping';
import RecipeModel, {
  RecipeCookedDbObject,
  RecipeDocument,
} from './models/recipe';
import UserModel, { UserDbObject, UserDocument } from './models/user';
import { pushImageUrl } from './recipeImage';
import { deleteImagePrefix, presignStagingUpload } from './s3';
import { importRecipeFromUrl } from './services/recipeImport';
import {
  checkUserRightsAsync,
  comparePassword,
  getRandomString,
  hashPassword,
} from './utils';

const populateFields = ['user', 'cookedHistory.user'];

const resolvers: Resolvers = {
  Query: {
    recipes: async () => {
      return (
        await RecipeModel.find({
          deleted: { $in: [false, null] },
        }).populate(populateFields)
      )
        .sort((a, b) => a.title.localeCompare(b.title, 'cs'))
        .map(mapToRecipeGqlObject);
    },
    recipe: async (_, args) => {
      if (!args.id && !args.slug) {
        return null;
      }

      if (args.id) {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          return null;
        }

        const recipe = await RecipeModel.findById(args.id).populate(
          populateFields,
        );

        return recipe && mapToRecipeGqlObject(recipe);
      }

      if (args.slug) {
        const recipe = await RecipeModel.findOne({ slug: args.slug }).populate(
          populateFields,
        );

        if (!recipe) {
          return null;
        }

        return mapToRecipeGqlObject(recipe);
      }

      return null;
    },
    ingredients: async () => {
      const ingredients: string[] =
        await RecipeModel.distinct('ingredients.name');

      return ingredients
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'cs'));
    },
    sideDishes: async () => {
      const sideDishes: string[] = await RecipeModel.distinct('sideDish');

      return sideDishes
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, 'cs'));
    },
    tags: async () => {
      const tags: string[] = await RecipeModel.distinct('tags');

      return [...tags].sort((a, b) =>
        a
          .toLocaleLowerCase('cs')
          .localeCompare(b.toLocaleLowerCase('cs'), 'cs'),
      );
    },
    me: authenticated(async (_, __, ctx) => ctx.currentUser),
    users: authenticated(
      async () => (await UserModel.find()).map(mapToUserGqlObject),
      {
        requireAdmin: true,
      },
    ),
  },
  Mutation: {
    login: async (_, args) => {
      const user = await UserModel.findOne({ username: args.username });

      if (!user || !(await comparePassword(args.password, user))) {
        throw new Error('Invalid credentials');
      }

      return { token: signToken(user.id) };
    },
    createImageUpload: authenticated(async (_, args) => {
      if (!isAllowedContentType(args.contentType)) {
        throw new Error('Only image files are allowed');
      }

      // Mint an opaque key; the client PUTs the original to staging/<key>.
      // createRecipe/updateRecipe later promote it (see promoteStagingImage).
      const key = randomUUID();
      const uploadUrl = await presignStagingUpload(key, args.contentType);

      return { key, uploadUrl };
    }),
    createRecipe: authenticated(async (_, args, ctx) => {
      // Promote the staged upload (validate + generate renditions) before we
      // create the recipe, so the stored key always points at real renditions
      // and the push notification below can reference the 1080×1080 JPEG.
      if (args.imageId) {
        await promoteStagingImage(args.imageId);
      }

      const recipeToSave = mapToRecipeDbObject(
        args.recipe,
        args.imageId ?? undefined,
        ctx.currentUser.id,
      );
      await RecipeModel.findOneAndDelete({
        slug: recipeToSave.slug,
        deleted: true,
      });

      let recipe: RecipeDocument;
      try {
        recipe = await RecipeModel.create(recipeToSave as RecipeDocument);
      } catch (e) {
        // Creation failed (e.g. slug conflict): the just-promoted image would
        // otherwise be a permanent orphan (not under staging/), so remove it.
        if (args.imageId) {
          await deleteImagePrefix(args.imageId).catch(logger.error);
        }
        throw e;
      }
      await recipe.populate(populateFields);

      const newRecipeGqlModel = mapToRecipeGqlObject(recipe);

      messaging
        .send({
          topic: process.env.NEW_RECIPES_TOPIC!,
          data: { recipe_id: newRecipeGqlModel.id },
          notification: {
            title: newRecipeGqlModel.title,
            body: `Nový recept od ${ctx.currentUser.displayName}!`,
          },
          android: newRecipeGqlModel.imageUrl
            ? {
                notification: {
                  imageUrl: pushImageUrl(newRecipeGqlModel.imageUrl),
                },
              }
            : undefined,
        })
        .catch(logger.error);

      return newRecipeGqlModel;
    }),
    updateRecipe: authenticated(async (_, args, ctx) => {
      if (!(await checkUserRightsAsync(ctx.currentUser, args.id))) {
        throw new Error('Unauthorized');
      }

      const recipe = await RecipeModel.findById(args.id).populate(
        populateFields,
      );

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      const origImageKey = recipe.image;
      const imageChanged = Boolean(
        args.imageId && args.imageId !== origImageKey,
      );

      // A new picture was uploaded: promote the staged upload first, so the
      // recipe never points at a key without renditions. promoteStagingImage
      // rejects a key that has no staging object (e.g. an arbitrary or
      // already-committed key lifted from another recipe's public imageUrl),
      // which prevents attaching — and later deleting — someone else's image.
      if (imageChanged) {
        await promoteStagingImage(args.imageId!);
      }

      const recipeToSave = mapToRecipeDbObject(
        args.recipe,
        args.imageId ?? undefined,
        undefined,
      );
      await RecipeModel.findOneAndDelete({
        slug: recipeToSave.slug,
        deleted: true,
      });
      await recipe.set(recipeToSave).save();
      await recipe.populate(populateFields);

      // Delete the previous image's S3 renditions — but only if no other recipe
      // still references that key (defence in depth). Best-effort: a failed
      // cleanup only leaves an orphan, it must not fail the update.
      if (imageChanged && origImageKey) {
        RecipeModel.exists({ image: origImageKey })
          .then((stillUsed) => {
            if (!stillUsed) {
              return deleteImagePrefix(origImageKey);
            }
          })
          .catch(logger.error);
      }

      return mapToRecipeGqlObject(recipe);
    }),
    deleteRecipe: authenticated(async (_, args, ctx) => {
      if (!(await checkUserRightsAsync(ctx.currentUser, args.id))) {
        throw new Error('Unauthorized');
      }

      const recipe = await RecipeModel.findByIdAndUpdate(args.id, {
        deleted: true,
        lastModifiedDate: new Date(),
      });

      if (!recipe) {
        throw new Error('Recipe not found or cannot be deleted');
      }

      return true;
    }),
    importRecipe: authenticated(async (_, args, ctx) => {
      const recipeInput = await importRecipeFromUrl(args.url);

      const recipeToSave = mapToRecipeDbObject(
        recipeInput,
        undefined,
        ctx.currentUser.id,
      );
      await RecipeModel.findOneAndDelete({
        slug: recipeToSave.slug,
        deleted: true,
      });
      const recipe = await RecipeModel.create(recipeToSave as RecipeDocument);
      await recipe.populate(populateFields);

      const newRecipeGqlModel = mapToRecipeGqlObject(recipe);

      messaging
        .send({
          topic: process.env.NEW_RECIPES_TOPIC!,
          data: { recipe_id: newRecipeGqlModel.id },
          notification: {
            title: newRecipeGqlModel.title,
            body: `Nový recept od ${ctx.currentUser.displayName}!`,
          },
          android: newRecipeGqlModel.imageUrl
            ? {
                notification: {
                  imageUrl: pushImageUrl(newRecipeGqlModel.imageUrl),
                },
              }
            : undefined,
        })
        .catch(logger.error);

      return newRecipeGqlModel;
    }),
    recipeCooked: authenticated(async (_, args, ctx) => {
      const recipe = await RecipeModel.findById(args.id);

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      recipe.cookedHistory = [
        ...recipe.cookedHistory,
        // "as UserDbObject" is only to satisfy TS, Mongoose is OK with just an ID when saving
        {
          date: args.date,
          user: ctx.currentUser.id as unknown as UserDbObject,
        } as RecipeCookedDbObject, // ignore ID, it's autogenerated
      ].sort((a, b) => a.date.valueOf() - b.date.valueOf());

      await recipe.save();
      await recipe.populate(populateFields);

      return mapToRecipeGqlObject(recipe);
    }),
    deleteRecipeCooked: authenticated(async (_, args, ctx) => {
      const recipe = await RecipeModel.findById(args.recipeId);

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      recipe.cookedHistory = recipe.cookedHistory.filter(
        (d) =>
          !(
            d.id === args.cookedId &&
            // user is not populated here so it's an ID
            ((d.user as unknown as string) === ctx.currentUser.id ||
              ctx.currentUser.isAdmin)
          ),
      );

      await recipe.save();
      await recipe.populate(populateFields);

      return mapToRecipeGqlObject(recipe);
    }),
    updateUserLastActivity: authenticated(async (_, __, ctx) => {
      await UserModel.findByIdAndUpdate(ctx.currentUser.id, {
        lastActivity: new Date(),
      });

      return true;
    }),
    createUser: authenticated(
      async (_, args) => {
        const userToSave: Partial<UserDbObject> = {
          ...mapToUserDbObject(args.user),
          password: await hashPassword(getRandomString(10)),
        };

        return mapToUserGqlObject(
          await UserModel.create(userToSave as UserDocument),
        );
      },
      { requireAdmin: true },
    ),
    updateUser: authenticated(
      async (_, args) => {
        const user = await UserModel.findById(args.id);

        if (!user) {
          throw new Error('User not found or cannot be updated');
        }

        await user.set(mapToUserDbObject(args.user)).save();

        return mapToUserGqlObject(user);
      },
      { requireAdmin: true },
    ),
    deleteUser: authenticated(
      async (_, args) => {
        const user = await UserModel.findByIdAndDelete(args.id);

        if (!user) {
          throw new Error('User not found or cannot be deleted');
        }

        return user.id;
      },
      { requireAdmin: true },
    ),
    resetPassword: authenticated(
      async (_, args) => {
        const user = await UserModel.findById(args.id);

        if (!user) {
          throw new Error('User not found or cannot be updated');
        }

        const password = getRandomString(10);

        await user
          .set({
            password: await hashPassword(password),
            salt: undefined,
          })
          .save();

        return password;
      },
      { requireAdmin: true },
    ),
    changePassword: authenticated(async (_, args, ctx) => {
      if (!(await comparePassword(args.password, ctx.currentUser))) {
        return false;
      }

      const user = await UserModel.findById(ctx.currentUser.id);

      if (!user) {
        throw new Error('User not found or cannot be updated');
      }

      await user
        .set({
          password: await hashPassword(args.newPassword),
          salt: undefined,
        })
        .save();

      return true;
    }),
  },
  Date: new GraphQLScalarType<Date | null, number | string>({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value as number | string); // value from the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(Number.parseInt(ast.value)); // ast value is always in string format
      }

      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }

      return null;
    },
    serialize(value) {
      return (value as Date).toISOString(); // value sent to the client
    },
  }),
};

export default resolvers;

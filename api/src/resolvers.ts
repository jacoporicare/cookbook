import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';

import { authenticated, signToken } from './auth';
import { messaging } from './firebase';
import { ImageFormat, Resolvers } from './generated/graphql';
import logger from './logger';
import {
  mapToRecipeDbObject,
  mapToRecipeGqlObject,
  mapToUserDbObject,
  mapToUserGqlObject,
} from './mapping';
import ImageModel from './models/image';
import RecipeModel, {
  RecipeCookedDbObject,
  RecipeDocument,
} from './models/recipe';
import UserModel, { UserDbObject, UserDocument } from './models/user';
import { appendSizeAndFormatToImageUrl } from './recipeImage';
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
      return (await RecipeModel.find().populate(populateFields))
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

      return [
        'Instant Pot',
        ...tags
          .filter((t) => t && t !== 'Instant Pot')
          .sort((a, b) => a.localeCompare(b, 'cs')),
      ];
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
    createRecipe: authenticated(async (_, args, ctx) => {
      const recipeToSave = mapToRecipeDbObject(
        args.recipe,
        args.imageId ?? undefined,
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
                  imageUrl: appendSizeAndFormatToImageUrl(
                    newRecipeGqlModel.imageUrl,
                    { width: 1080, height: 1080 },
                    ImageFormat.Webp,
                  ),
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

      const origImage = recipe.image;
      const origImageId =
        typeof origImage === 'string' ? origImage : origImage?.id;
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

      // Delete old image if a new one was provided
      if (args.imageId && origImageId && args.imageId !== origImageId) {
        await ImageModel.findByIdAndDelete(origImage);
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
                  imageUrl: appendSizeAndFormatToImageUrl(
                    newRecipeGqlModel.imageUrl,
                    { width: 1080, height: 1080 },
                    ImageFormat.Webp,
                  ),
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
        const user = await UserModel.findByIdAndRemove(args.id);

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
  Recipe: {
    imageUrl: (recipe, args) =>
      recipe.imageUrl
        ? appendSizeAndFormatToImageUrl(recipe.imageUrl, args.size, args.format)
        : null,
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

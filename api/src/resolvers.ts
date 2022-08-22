import { GraphQLScalarType, Kind } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import mongoose from 'mongoose';

import { authenticated, signToken } from './auth';
import { messaging } from './firebase';
import { ImageFormat, Resolvers } from './generated/graphql';
import logger from './logger';
import { mapToRecipeDbObject, mapToRecipeGqlObject, mapToUserGqlObject } from './mapping';
import imageModel from './models/image';
import recipeModel, { RecipeDocument } from './models/recipe';
import userModel, { UserDbObject, UserDocument } from './models/user';
import { appendSizeAndFormatToImageUrl, createImage } from './recipeImage';
import { checkUserRightsAsync, getRandomString, saltHashPassword, sha512 } from './utils';

const resolvers: Resolvers = {
  Query: {
    recipes: async (_, args) => {
      const filter: mongoose.FilterQuery<RecipeDocument> = {};

      if (args.since) {
        filter.lastModifiedDate = { $gt: args.since };
      }

      if (!args.deleted) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter.deleted = { $in: [false, null] as any };
      }

      return (await recipeModel.find(filter).populate('user'))
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

        const recipe = await recipeModel.findById(args.id).populate('user');

        return recipe && mapToRecipeGqlObject(recipe);
      }

      if (args.slug) {
        const recipe = await recipeModel.findOne({ slug: args.slug }).populate('user');

        return recipe && mapToRecipeGqlObject(recipe);
      }

      return null;
    },
    ingredients: async () => {
      const ingredients: string[] = await recipeModel.distinct('ingredients.name');

      return ingredients.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
    },
    sideDishes: async () => {
      const sideDishes: string[] = await recipeModel.distinct('sideDish');

      return sideDishes.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
    },
    tags: async () => {
      const tags: string[] = await recipeModel.distinct('tags');

      return tags.filter(Boolean).sort((a, b) => a.localeCompare(b, 'cs'));
    },
    me: authenticated(async (_, __, ctx) => ({
      ...ctx.currentUser,
      isAdmin: ctx.currentUser.isAdmin ?? false,
    })),
    users: authenticated(async () => await userModel.find(), { requireAdmin: true }),
  },
  Mutation: {
    login: async (_, args) => {
      const user = await userModel.findOne({ username: args.username });

      if (!user || sha512(args.password, user.salt) !== user.password) {
        throw new Error('Invalid credentials');
      }

      return { token: signToken(user.id) };
    },
    createRecipe: authenticated(async (_, args, ctx) => {
      const image = args.image && (await createImage(args.image));
      const recipeToSave = mapToRecipeDbObject(args.recipe, image?.id, ctx.currentUser.id);
      await recipeModel.findOneAndDelete({ slug: recipeToSave.slug, deleted: true });
      const recipe = await recipeModel.create(recipeToSave as RecipeDocument);
      const newRecipe = await recipe.populate('user');

      const newRecipeGqlModel = mapToRecipeGqlObject(newRecipe);

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

      const origRecipe = await recipeModel.findById(args.id);

      if (!origRecipe) {
        throw new Error('Recipe not found');
      }

      const image = args.image && (await createImage(args.image));
      const recipeToSave = mapToRecipeDbObject(args.recipe, image?.id, undefined);

      const newRecipe = await recipeModel
        .findByIdAndUpdate(args.id, { $set: recipeToSave }, { new: true })
        .populate('user');

      if (!newRecipe) {
        throw new Error('Recipe cannot be updated');
      }

      if (args.image && origRecipe.imageId) {
        await imageModel.findByIdAndDelete(origRecipe.imageId);
      }

      return mapToRecipeGqlObject(newRecipe);
    }),
    deleteRecipe: authenticated(async (_, args, ctx) => {
      if (!(await checkUserRightsAsync(ctx.currentUser, args.id))) {
        throw new Error('Unauthorized');
      }

      const recipe = await recipeModel.findByIdAndUpdate(args.id, {
        deleted: true,
        lastModifiedDate: new Date(),
      });

      if (!recipe) {
        throw new Error('Recipe not found or cannot be deleted');
      }

      return true;
    }),
    updateUserLastActivity: authenticated(async (_, __, ctx) => {
      await userModel.findByIdAndUpdate(ctx.currentUser.id, { lastActivity: new Date() });

      return true;
    }),
    createUser: authenticated(
      async (_, args) => {
        const password = getRandomString(10);
        const { hash, salt } = saltHashPassword(password);

        const userToSave: Partial<UserDbObject> = {
          ...args.user,
          username: args.user.username.trim(),
          displayName: args.user.displayName.trim(),
          password: hash,
          salt,
          isAdmin: args.user.isAdmin ? true : undefined,
        };

        return mapToUserGqlObject(await userModel.create(userToSave as UserDocument));
      },
      { requireAdmin: true },
    ),
    updateUser: authenticated(
      async (_, args) => {
        const userToSave = {
          ...args.user,
          username: args.user.username.trim(),
          displayName: args.user.displayName.trim(),
          isAdmin: args.user.isAdmin ? true : undefined,
        };

        const user = await userModel.findByIdAndUpdate(
          args.id,
          { $set: userToSave },
          { new: true },
        );

        if (!user) {
          throw new Error('User not found or cannot be updated');
        }

        return mapToUserGqlObject(user);
      },
      { requireAdmin: true },
    ),
    deleteUser: authenticated(
      async (_, args) => {
        const user = await userModel.findByIdAndRemove(args.id);

        if (!user) {
          throw new Error('User not found or cannot be deleted');
        }

        return user.id;
      },
      { requireAdmin: true },
    ),
    resetPassword: authenticated(
      async (_, args) => {
        const password = getRandomString(10);
        const { hash, salt } = saltHashPassword(password);

        const user = await userModel.findByIdAndUpdate(args.id, {
          $set: {
            password: hash,
            salt,
          },
        });

        if (!user) {
          throw new Error('User not found or cannot be updated');
        }

        return password;
      },
      { requireAdmin: true },
    ),
    changePassword: authenticated(async (_, args, ctx) => {
      if (sha512(args.password, ctx.currentUser.salt) !== ctx.currentUser.password) {
        return false;
      }

      const { hash, salt } = saltHashPassword(args.newPassword);

      const user = await userModel.findByIdAndUpdate(ctx.currentUser.id, {
        $set: {
          password: hash,
          salt,
        },
      });

      if (!user) {
        throw new Error('User not found or cannot be updated');
      }

      return true;
    }),
  },
  Recipe: {
    imageUrl: (recipe, args) =>
      recipe.imageUrl
        ? appendSizeAndFormatToImageUrl(recipe.imageUrl, args.size, args.format)
        : null,
  },
  Upload: GraphQLUpload,
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

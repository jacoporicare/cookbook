/* eslint-disable no-console */
import { GraphQLScalarType, Kind } from 'graphql';
import { IResolvers } from 'graphql-tools';
import mongoose from 'mongoose';

import { connect } from '../db';

import { signToken, authenticated } from './auth';
import { deleteImage, renameImage, uploadImage } from './images';
import recipeModel, { RecipeDocument } from './models/recipe';
import userModel, { User, UserDocument } from './models/user';
import { FileUpload, RecipeInput, UserInput } from './types';
import {
  checkUserRightsAsync,
  getRandomString,
  prepareRecipe,
  saltHashPassword,
  sha512,
  mapRecipe,
} from './utils';

connect();

const resolvers: IResolvers = {
  Query: {
    recipes: async (_, args: { since?: Date; deleted?: boolean }) => {
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
        .map(mapRecipe);
    },
    recipe: async (_, args: { id?: string; slug?: string }) => {
      if (!args.id && !args.slug) {
        return null;
      }

      if (args.id) {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          return null;
        }

        return mapRecipe(await recipeModel.findById(args.id).populate('user'));
      }

      if (args.slug) {
        return mapRecipe(await recipeModel.findOne({ slug: args.slug }).populate('user'));
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
    me: authenticated(async (_, __, ctx) => ctx.currentUser),
    users: authenticated(async () => await userModel.find(), { requireAdmin: true }),
  },
  Mutation: {
    login: async (_, args: { username: string; password: string }) => {
      const user = await userModel.findOne({ username: args.username });

      if (!user || sha512(args.password, user.salt) !== user.password) {
        throw new Error('Invalid credentials');
      }

      return { token: signToken(user.id) };
    },
    createRecipe: authenticated(
      async (_, args: { recipe: RecipeInput; image?: Promise<FileUpload> }, ctx) => {
        const recipeToSave = prepareRecipe(args.recipe, Boolean(args.image), ctx.currentUser._id);
        await recipeModel.findOneAndDelete({ slug: recipeToSave.slug, deleted: true });
        const recipe = await recipeModel.create(recipeToSave as RecipeDocument);
        recipe.populate('user');

        const newRecipe = await recipe.execPopulate();

        if (args.image) {
          const fileUpload = await args.image;
          await uploadImage(newRecipe.imageName!, fileUpload);
        }

        return mapRecipe(newRecipe);
      },
    ),
    updateRecipe: authenticated(
      async (_, args: { id: string; recipe: RecipeInput; image?: Promise<FileUpload> }, ctx) => {
        if (!(await checkUserRightsAsync(ctx.currentUser, args.id))) {
          throw new Error('Unauthorized');
        }

        const origRecipe = await recipeModel.findById(args.id);

        if (!origRecipe) {
          throw new Error('Recipe not found');
        }

        const recipeToSave = prepareRecipe(
          args.recipe,
          args.image ? true : undefined,
          undefined,
          origRecipe,
        );

        const newRecipe = await recipeModel
          .findByIdAndUpdate(args.id, { $set: recipeToSave }, { new: true })
          .populate('user');

        if (!newRecipe) {
          throw new Error('Recipe cannot be updated');
        }

        if (args.image) {
          const origRecipeImageName = origRecipe.imageName;

          const fileUpload = await args.image;
          await uploadImage(newRecipe.imageName!, fileUpload);

          if (origRecipeImageName) {
            await deleteImage(origRecipeImageName);
          }
        } else if (origRecipe.imageName && origRecipe.slug !== newRecipe.slug) {
          await renameImage(origRecipe.imageName, newRecipe.imageName!);
        }

        return mapRecipe(newRecipe);
      },
    ),
    deleteRecipe: authenticated(async (_, args: { id: string }, ctx) => {
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

      if (recipe.imageName) {
        await deleteImage(recipe.imageName);
      }

      return true;
    }),
    updateUserLastActivity: authenticated(async (_, __, ctx) => {
      await userModel.findByIdAndUpdate(ctx.currentUser._id, { lastActivity: new Date() });

      return true;
    }),
    createUser: authenticated(
      async (_, args: { user: UserInput }) => {
        const password = getRandomString(10);
        const { hash, salt } = saltHashPassword(password);

        const userToSave: Partial<User> = {
          ...args.user,
          username: args.user.username.trim(),
          displayName: args.user.displayName.trim(),
          password: hash,
          salt,
          isAdmin: args.user.isAdmin ? true : undefined,
        };

        return await userModel.create(userToSave as UserDocument);
      },
      { requireAdmin: true },
    ),
    updateUser: authenticated(
      async (_, args: { id: string; user: UserInput }) => {
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

        return user;
      },
      { requireAdmin: true },
    ),
    deleteUser: authenticated(
      async (_, args: { id: string }) => {
        const user = await userModel.findByIdAndRemove(args.id);

        if (!user) {
          throw new Error('User not found or cannot be deleted');
        }

        return user;
      },
      { requireAdmin: true },
    ),
    resetPassword: authenticated(
      async (_, args: { id: string }) => {
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
    changePassword: authenticated(
      async (_, args: { password: string; newPassword: string }, ctx) => {
        if (sha512(args.password, ctx.currentUser.salt) !== ctx.currentUser.password) {
          return false;
        }

        const { hash, salt } = saltHashPassword(args.newPassword);

        const user = await userModel.findByIdAndUpdate(ctx.currentUser._id, {
          $set: {
            password: hash,
            salt,
          },
        });

        if (!user) {
          throw new Error('User not found or cannot be updated');
        }

        return true;
      },
    ),
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(Number.parseInt(ast.value)); // ast value is always in string format
      }

      if (ast.kind === Kind.STRING) {
        return new Date(ast.kind);
      }

      return null;
    },
    serialize(value: Date) {
      return value.valueOf(); // value sent to the client
    },
  }),
};

export default resolvers;

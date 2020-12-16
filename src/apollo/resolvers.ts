/* eslint-disable no-console */
import { GraphQLScalarType, Kind } from 'graphql';
import { IResolvers } from 'graphql-tools';
import mongoose from 'mongoose';

import { connect } from '../db';

import { signToken, authenticated } from './auth';
import { deleteImage, renameImage, uploadImage, fileUploadToBuffer } from './images';
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
    recipes: async () =>
      (await recipeModel.find({}).populate('user'))
        .sort((a, b) => a.title.localeCompare(b.title, 'cs'))
        .map(mapRecipe),
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
    me: authenticated(async (_, __, ctx) => ctx.currentUser, { dontThrow: true }),
    users: authenticated(async () => await userModel.find(), { requireAdmin: true }),
  },
  Mutation: {
    login: async (_, args: { username: string; password: string }) => {
      const user = await userModel.findOne({ username: args.username });

      return {
        token:
          user?.id && sha512(args.password, user.salt) === user.password
            ? signToken(user.id)
            : null,
      };
    },
    createRecipe: authenticated(
      async (_, args: { recipe: RecipeInput; image?: Promise<FileUpload> }, ctx) => {
        const recipeToSave = prepareRecipe(args.recipe, Boolean(args.image), ctx.currentUser);
        const recipe = await recipeModel.create(recipeToSave as RecipeDocument);
        recipe.populate('user');

        const newRecipe = await recipe.execPopulate();

        if (args.image) {
          const image = await fileUploadToBuffer(args.image);
          await uploadImage(newRecipe.imageName!, image);
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
          return null;
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
          return null;
        }

        if (args.image) {
          const image = await fileUploadToBuffer(args.image);

          await uploadImage(newRecipe.imageName!, image);

          if (origRecipe.imageName) {
            await deleteImage(origRecipe.imageName);
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

      const recipe = await recipeModel.findByIdAndRemove(args.id);

      if (!recipe) {
        return false;
      }

      if (recipe.imageName) {
        // We don't await
        deleteImage(recipe.imageName);
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

        return await userModel.findByIdAndUpdate(args.id, { $set: userToSave }, { new: true });
      },
      { requireAdmin: true },
    ),
    deleteUser: authenticated(
      async (_, args: { id: string }) => {
        const user = await userModel.findByIdAndRemove(args.id);

        return user ? user._id : null;
      },
      { requireAdmin: true },
    ),
    resetPassword: authenticated(
      async (_, args: { id: string }) => {
        const password = getRandomString(10);
        const { hash, salt } = saltHashPassword(password);

        await userModel.findByIdAndUpdate(args.id, {
          $set: {
            password: hash,
            salt,
          },
        });

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

        await userModel.findByIdAndUpdate(ctx.currentUser._id, {
          $set: {
            password: hash,
            salt,
          },
        });

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

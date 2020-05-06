/* eslint-disable no-console */
import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import mongoose from 'mongoose';

import { signToken } from '../auth';
import recipeModel from '../models/recipe';
import userModel, { User } from '../models/user';
import { RecipeInput, FileUpload, UserInput } from '../types';
import {
  checkUserRightsAsync,
  getRandomString,
  prepareRecipe,
  saltHashPassword,
  sha512,
  uploadImageToS3,
  deleteImageFromS3,
} from '../utils';

export type Context = {
  user?: User;
};

const resolvers: IResolvers = {
  Query: {
    recipes: async () =>
      (await recipeModel.find({}).populate('user')).sort((a, b) =>
        a.title.localeCompare(b.title, 'cs'),
      ),
    recipe: async (_, args: { id?: string; slug?: string }) => {
      if (!args.id && !args.slug) {
        return null;
      }

      if (args.id) {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          return null;
        }

        return await recipeModel.findById(args.id).populate('user');
      }

      if (args.slug) {
        return await recipeModel.findOne({ slug: args.slug }).populate('user');
      }
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
    me: async (_, __, context) => {
      if (!context.user) {
        return null;
      }

      return context.user;
    },
    users: async (_, __, context: Context) => {
      if (!context.user || !context.user.isAdmin) {
        return null;
      }

      return await userModel.find();
    },
  },
  Mutation: {
    login: async (_, args: { username: string; password: string }) => {
      const user = await userModel.findOne({ username: args.username });

      return {
        token:
          user && sha512(args.password, user.salt) === user.password ? signToken(user.id) : null,
      };
    },
    createRecipe: async (
      _,
      args: { recipe: RecipeInput; image?: Promise<FileUpload> },
      context: Context,
    ) => {
      if (!context.user) {
        return null;
      }

      const recipeToSave = prepareRecipe(args.recipe, Boolean(args.image), context.user);
      const recipe = await recipeModel.create(recipeToSave);
      recipe.populate('user');

      const newRecipe = await recipe.execPopulate();

      if (args.image) {
        // We don't await
        uploadImageToS3(newRecipe.slug, args.image);
      }

      return newRecipe;
    },
    updateRecipe: async (
      _,
      args: { id: string; recipe: RecipeInput; image?: Promise<FileUpload> },
      context: Context,
    ) => {
      if (!context.user || !(await checkUserRightsAsync(context.user, args.id))) {
        return null;
      }

      const recipeToSave = prepareRecipe(args.recipe, args.image ? true : undefined);

      const newRecipe = await recipeModel
        .findByIdAndUpdate(args.id, { $set: recipeToSave }, { new: true })
        .populate('user');

      if (newRecipe && args.image) {
        // We don't await
        uploadImageToS3(newRecipe.slug, args.image);
      }

      return newRecipe;
    },
    deleteRecipe: async (_, args: { id: string }, context: Context) => {
      if (!context.user || !(await checkUserRightsAsync(context.user, args.id))) {
        return false;
      }

      const recipe = await recipeModel.findByIdAndRemove(args.id);

      if (!recipe) {
        return false;
      }

      // We don't await
      deleteImageFromS3(recipe.slug);

      return true;
    },
    updateUserLastActivity: async (_, __, context: Context) => {
      if (!context.user) {
        return false;
      }

      await userModel.findByIdAndUpdate(context.user._id, { lastActivity: new Date() });

      return true;
    },
    createUser: async (_, args: { user: UserInput }, context: Context) => {
      if (!context.user || !context.user.isAdmin) {
        return null;
      }

      const password = getRandomString(10);
      const { hash, salt } = saltHashPassword(password);

      const userToSave: Partial<User> = {
        ...args.user,
        username: args.user.username.trim(),
        displayName: args.user.displayName.trim(),
        password: hash,
        salt,
      };

      return await userModel.create(userToSave);
    },
    updateUser: async (_, args: { id: string; user: UserInput }, context: Context) => {
      if (!context.user || !context.user.isAdmin) {
        return null;
      }

      const userToSave = {
        ...args.user,
        username: args.user.username.trim(),
        displayName: args.user.displayName.trim(),
      };

      return await userModel.findByIdAndUpdate(args.id, { $set: userToSave }, { new: true });
    },
    deleteUser: async (_, args: { id: string }, context: Context) => {
      if (!context.user || !context.user.isAdmin) {
        return false;
      }

      const user = await userModel.findByIdAndRemove(args.id);

      return user ? user._id : null;
    },
    resetPassword: async (_, args: { id: string }, context: Context) => {
      if (!context.user || !context.user.isAdmin) {
        return null;
      }

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
    changePassword: async (
      _,
      args: { password: string; newPassword: string },
      context: Context,
    ) => {
      if (!context.user || sha512(args.password, context.user.salt) !== context.user.password) {
        return false;
      }

      const { hash, salt } = saltHashPassword(args.newPassword);

      await userModel.findByIdAndUpdate(context.user._id, {
        $set: {
          password: hash,
          salt,
        },
      });

      return true;
    },
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

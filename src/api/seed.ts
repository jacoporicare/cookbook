import * as db from '../db';
import recipeModel from '../models/recipe';
import userModel from '../models/user';

import { saltHashPassword } from './apolloServer';

export async function seed() {
  db.connect();

  await userModel.deleteMany({}).exec();
  await recipeModel.deleteMany({}).exec();

  const pass1 = saltHashPassword('user');
  const user = await userModel.create({
    username: 'user',
    displayName: 'User',
    password: pass1.hash,
    salt: pass1.salt,
  });

  const pass2 = saltHashPassword('admin');
  const admin = await userModel.create({
    username: 'admin',
    displayName: 'Admin',
    password: pass2.hash,
    salt: pass2.salt,
    isAdmin: true,
  });

  await recipeModel.create({
    user: user._id,
    title: 'Recept user',
    slug: 'recept-user',
    directions: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Nullam rhoncus aliquam metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Aenean vel massa quis mauris vehicula lacinia. Sed ac dolor sit amet purus malesuada congue. Nulla quis diam. Integer pellentesque quam vel velit. Nulla pulvinar eleifend sem. Integer vulputate sem a nibh rutrum consequat.
Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Morbi scelerisque luctus velit. Fusce nibh. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Vestibulum fermentum tortor id mi. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Nullam dapibus fermentum ipsum. Donec iaculis gravida nulla. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nulla pulvinar eleifend sem. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Phasellus rhoncus. Integer tempor. Maecenas lorem.
Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ac dolor sit amet purus malesuada congue. Mauris tincidunt sem sed arcu. Duis bibendum, lectus ut viverra rhoncus, dolor nunc faucibus libero, eget facilisis enim ipsum id lacus. In convallis. Nunc tincidunt ante vitae massa. Donec iaculis gravida nulla. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Donec vitae arcu. Pellentesque ipsum. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Maecenas sollicitudin. Aenean fermentum risus id tortor. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Etiam bibendum elit eget erat. Mauris elementum mauris vitae tortor. Aliquam in lorem sit amet leo accumsan lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.`,
    lastModifiedDate: Date.now(),
    ingredients: [],
  });

  await recipeModel.create({
    user: admin._id,
    title: 'Recept admin',
    slug: 'recept-admin',
    directions: 'Postup',
    sideDish: 'příloha',
    preparationTime: 90,
    servingCount: 4,
    lastModifiedDate: Date.now(),
    ingredients: [
      {
        amount: 10,
        amountUnit: 'ks',
        name: 'ing 1',
        isGroup: false,
      },
      {
        name: 'ing 2',
        isGroup: false,
      },
      {
        name: 'Skupina',
        isGroup: true,
      },
      {
        name: 'ing 3',
        isGroup: false,
      },
    ],
  });

  // eslint-disable-next-line no-console
  console.log('🎉 Seed successful');
  process.exit(0);
}

'use client';

import { ChangePasswordContainer as ChangePassword } from '@/components/ChangePassword/ChangePassword.container';
import { Layout } from '@/components/Layout';
import { RecipeBaseFragment } from '@/generated/graphql';
import { User } from '@/types/user';

type Props = {
  recipes: RecipeBaseFragment[];
  user: User;
};

export function SettingsPage({ recipes, user }: Props) {
  return (
    <Layout recipes={recipes} user={user}>
      <ChangePassword />
    </Layout>
  );
}

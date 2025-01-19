import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserInputType } from './types/user-input.type';
import { UserType } from './types/user.type';

@Resolver(() => UserType)
export class UserResolver {
  @Query(() => [UserType])
  users(): UserType[] {
    return [];
  }

  @Mutation(() => Boolean)
  updateUserLastActivity(): boolean {
    return false;
  }

  @Mutation(() => UserType)
  createUser(@Args('user') user: UserInputType): UserType {
    return null;
  }

  @Mutation(() => UserType)
  updateUser(@Args('id') id: string, @Args('user') user: UserInputType): UserType {
    return null;
  }

  @Mutation(() => ID)
  deleteUser(@Args('id') id: string): string {
    return '';
  }

  @Mutation(() => String)
  resetPassword(@Args('id') id: string): string {
    return '';
  }
}

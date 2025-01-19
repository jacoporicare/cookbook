import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthPayloadType } from './types/auth.type';

import { UserType } from '@/modules2/user/graphql/types/user.type';

@Resolver(() => AuthPayloadType)
export class AuthResolver {
  @Query(() => UserType, { nullable: true })
  me(): UserType {
    return null;
  }

  @Mutation(() => AuthPayloadType)
  login(@Args('username') username: string, @Args('password') password: string): AuthPayloadType {
    return { token: '' };
  }

  @Mutation(() => Boolean)
  changePassword(
    @Args('password') password: string,
    @Args('newPassword') newPassword: string,
  ): boolean {
    return false;
  }
}

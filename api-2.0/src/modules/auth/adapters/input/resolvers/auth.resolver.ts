import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthPayload } from '../graphql/auth-payload.type';

import { AuthService } from '@/modules/auth/application/auth.service';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Identity } from '@/modules/auth/domain/identity';
import { UserType } from '@/modules/user/adapters/input/graphql/user.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserType, { nullable: true })
  async me(@CurrentUser() identity: Identity | null): Promise<UserType | null> {
    return identity ? UserType.fromIdentity(identity) : null;
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthPayload> {
    const identity = await this.authService.verifyCredentials(username, password);

    if (!identity) {
      throw new Error('Invalid credentials');
    }

    return {
      token: this.authService.signToken(identity),
    };
  }
}

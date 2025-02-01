import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthPayload } from '../graphql/auth-payload.type';

import { AuthService } from '@/modules/auth/application/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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

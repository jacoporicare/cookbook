import { Query, Resolver } from '@nestjs/graphql';

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
}

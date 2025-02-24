import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Identity } from '@/modules/auth/domain/identity';
import { User } from '@/modules/user/domain/user';

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  displayName!: string;

  @Field()
  isAdmin!: boolean;

  @Field(() => Date, { nullable: true })
  lastActivity!: Date | null;

  static fromDomain(user: User): UserType {
    const type = new UserType();
    type.id = user.id;
    type.username = user.username;
    type.displayName = user.displayName;
    type.isAdmin = user.isAdmin;
    type.lastActivity = user.lastActivity;

    return type;
  }

  static fromIdentity(identity: Identity): UserType {
    const type = new UserType();
    type.id = identity.userId;
    type.username = identity.username;
    type.displayName = identity.displayName;
    type.isAdmin = identity.isAdmin;
    type.lastActivity = identity.lastActivity;

    return type;
  }
}

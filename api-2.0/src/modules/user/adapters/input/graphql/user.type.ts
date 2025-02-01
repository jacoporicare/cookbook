import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '@/modules/user/domain/entities/user';

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
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
      lastActivity: user.lastActivity,
    };
  }
}

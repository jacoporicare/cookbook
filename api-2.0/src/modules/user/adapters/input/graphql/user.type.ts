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
    const type = new UserType();
    type.id = user.id;
    type.username = user.username;
    type.displayName = user.displayName;
    type.isAdmin = user.isAdmin;
    type.lastActivity = user.lastActivity;

    return type;
  }
}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  isAdmin: boolean;

  @Field(() => Date, { nullable: true })
  lastActivity?: Date;
}

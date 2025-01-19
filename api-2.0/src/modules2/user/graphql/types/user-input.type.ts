import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInputType {
  @Field()
  username: string;

  @Field()
  displayName: string;

  @Field()
  isAdmin: boolean;
}

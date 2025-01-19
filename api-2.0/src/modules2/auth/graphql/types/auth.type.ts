import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayloadType {
  @Field()
  token: string;
}

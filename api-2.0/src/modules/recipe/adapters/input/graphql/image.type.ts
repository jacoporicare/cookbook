import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Image')
export class ImageType {
  @Field()
  url!: string;

  @Field()
  thumbnailUrl!: string;
}

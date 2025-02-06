import { Field, ObjectType } from '@nestjs/graphql';

import { FileUpload } from '@/modules/storage/domain/storage.port';

@ObjectType('FileUpload')
export class FileUploadType {
  @Field()
  key!: string;

  @Field()
  url!: string;

  static fromDomain(file: FileUpload): FileUploadType {
    const type = new FileUploadType();
    type.key = file.key;
    type.url = file.url;

    return type;
  }
}

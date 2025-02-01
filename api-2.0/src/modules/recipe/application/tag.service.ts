import { Inject, Injectable } from '@nestjs/common';

import { ITagRepository, ITagRepositoryToken } from '../domain/ports/tag.repository';

@Injectable()
export class TagService {
  constructor(@Inject(ITagRepositoryToken) private readonly repository: ITagRepository) {}

  async getAllTags(): Promise<string[]> {
    return this.repository.findAll();
  }
}

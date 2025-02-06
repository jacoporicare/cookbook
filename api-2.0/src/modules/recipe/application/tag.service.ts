import { Inject, Injectable } from '@nestjs/common';

import { ITagRepositoryToken, ITagRepository } from '../ports/output/tag.repository';

@Injectable()
export class TagService {
  constructor(@Inject(ITagRepositoryToken) private readonly repository: ITagRepository) {}

  async getAllTags(): Promise<string[]> {
    return this.repository.findAll();
  }
}

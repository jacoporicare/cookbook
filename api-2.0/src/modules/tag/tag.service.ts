import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '@/db/entities';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getOrCreate(name: string): Promise<Tag> {
    let tag = await this.tagRepository.findOneBy({ name });

    if (!tag) {
      tag = this.tagRepository.create({ name });

      await this.tagRepository.save(tag);
    }

    return tag;
  }

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }
}

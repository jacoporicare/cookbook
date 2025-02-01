import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/modules/user/domain/entities/user';
import { IUserRepository } from '@/modules/user/domain/ports/user.repository';
import { UserEntity } from '@/modules/user/infrastructure/orm/user.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity?.toDomain() ?? null;
  }
}

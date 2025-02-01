import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAuthRepository } from '@/modules/auth/domain/ports/auth.repository';
import { User } from '@/modules/user/domain/entities/user';
import { UserEntity } from '@/modules/user/infrastructure/orm/user.entity';

@Injectable()
export class TypeOrmAuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity?.toDomain() ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ username });

    return entity?.toDomain() ?? null;
  }
}

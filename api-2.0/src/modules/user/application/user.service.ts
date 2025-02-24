import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository, IUserRepositoryToken } from '../ports/output/user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(IUserRepositoryToken) private readonly repository: IUserRepository) {}

  async findById(id: string) {
    return this.repository.findById(id);
  }
}

import { User } from '@/modules/user/domain/user';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}

export const IUserRepositoryToken = Symbol('IUserRepository');

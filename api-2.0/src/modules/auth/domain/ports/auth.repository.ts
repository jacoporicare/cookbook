import { User } from '@/modules/user/domain/entities/user';

export interface IAuthRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export const IAuthRepositoryToken = Symbol('IAuthRepository');

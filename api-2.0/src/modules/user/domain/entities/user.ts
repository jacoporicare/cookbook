import { v4 as uuidv4 } from 'uuid';

import { Password } from '../value-objects/password';

export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public password: Password,
    public displayName: string,
    public isAdmin: boolean,
    public lastActivity: Date,
    public createdDate: Date,
    public updatedDate: Date,
  ) {}

  static createNew(user: Omit<User, 'id'>) {
    const id = uuidv4();

    return new User(
      id,
      user.username,
      user.password,
      user.displayName,
      user.isAdmin,
      user.lastActivity,
      user.createdDate,
      user.updatedDate,
    );
  }

  async changePassword(newPlainPassword: string): Promise<void> {
    this.password = await Password.create(newPlainPassword);
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    return this.password.compare(plainPassword);
  }
}

import bcrypt from 'bcrypt';

export class Password {
  private constructor(private readonly hashedPassword: string) {}

  static async create(plainPassword: string): Promise<Password> {
    if (plainPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const hashed = await bcrypt.hash(plainPassword, 10);

    return new Password(hashed);
  }

  static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hashedPassword);
  }

  // For persistence
  toString(): string {
    return this.hashedPassword;
  }
}

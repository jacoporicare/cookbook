export class Identity {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly displayName: string,
    public readonly isAdmin: boolean,
    public readonly lastActivity: Date | null,
  ) {}
}

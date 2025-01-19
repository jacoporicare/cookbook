export class CreateUserDto {
  username: string;
  displayName: string;
  password: string;
  isAdmin?: boolean;
}

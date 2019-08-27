export class UpdateProfileCommand {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly avatarPath: string,
  ) {}
}

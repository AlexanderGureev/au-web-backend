export class UpdateProfileByIdCommand {
  constructor(
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly avatarPath: string,
  ) {}
}

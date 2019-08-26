export declare class UpdateProfileByIdCommand {
    readonly userId: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly avatarPath: string;
    constructor(userId: number, firstName: string, lastName: string, avatarPath: string);
}

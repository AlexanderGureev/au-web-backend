import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProfileByIdCommand } from '../impl'
import { ProfileRepository } from '@au/db'

@CommandHandler(UpdateProfileByIdCommand)
export class UpdateProfileByIdHandler
  implements ICommandHandler<UpdateProfileByIdCommand> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: UpdateProfileByIdCommand) {
    try {
      const { userId, ...profile } = command
      const updatedProfile = await this.profileRepository.updateProfileById(
        userId,
        profile,
      )

      return updatedProfile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

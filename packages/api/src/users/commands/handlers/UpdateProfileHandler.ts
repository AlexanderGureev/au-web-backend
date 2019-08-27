import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProfileCommand } from '../impl'
import { ProfileRepository } from '@au/db'

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: UpdateProfileCommand) {
    try {
      const { id, ...profile } = command
      const updatedProfile = await this.profileRepository.updateProfileById(
        id,
        profile,
      )

      return updatedProfile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUserProfileCommand } from '../impl'
import { ProfileRepository } from '@au/db'

@CommandHandler(GetUserProfileCommand)
export class GetUserProfileHandler
  implements ICommandHandler<GetUserProfileCommand> {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(command: GetUserProfileCommand) {
    try {
      const profile = await this.profileRepository.findById(command.id)
      return profile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

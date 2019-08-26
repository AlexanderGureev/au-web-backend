import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUserProfileCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from '@au/entities'

@CommandHandler(GetUserProfileCommand)
export class GetUserProfileHandler
  implements ICommandHandler<GetUserProfileCommand> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async execute(command: GetUserProfileCommand) {
    try {
      const profile = await this.profileRepository.findOne({
        userId: command.id,
      })
      return profile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

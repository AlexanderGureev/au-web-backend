import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProfileCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from '@au/entities'

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async execute(command: UpdateProfileCommand) {
    try {
      const { id, ...profile } = command
      await this.profileRepository
        .createQueryBuilder()
        .update(Profile, profile)
        .where('userId = :id', { id })
        .execute()

      const updatedProfile = await this.profileRepository.findOne({
        userId: id,
      })

      return updatedProfile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

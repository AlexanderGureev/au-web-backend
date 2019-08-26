import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateProfileByIdCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from '@au/entities'

@CommandHandler(UpdateProfileByIdCommand)
export class UpdateProfileByIdHandler
  implements ICommandHandler<UpdateProfileByIdCommand> {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async execute(command: UpdateProfileByIdCommand) {
    try {
      const { userId, ...profile } = command
      await this.profileRepository
        .createQueryBuilder()
        .update(Profile, profile)
        .where('userId = :userId', { userId })
        .execute()

      const updatedProfile = await this.profileRepository.findOne({
        userId,
      })

      return updatedProfile
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

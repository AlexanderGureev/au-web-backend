import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUsersCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@au/entities'

@CommandHandler(GetUsersCommand)
export class GetUsersHandler implements ICommandHandler<GetUsersCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: GetUsersCommand) {
    try {
      const users = await this.userRepository.findAndCount({})
      return users
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

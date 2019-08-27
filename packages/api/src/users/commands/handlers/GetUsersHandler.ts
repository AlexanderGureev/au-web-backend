import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUsersCommand } from '../impl'
import { UserRepository } from '@au/db'

@CommandHandler(GetUsersCommand)
export class GetUsersHandler implements ICommandHandler<GetUsersCommand> {
  constructor(private readonly userRepository: UserRepository) {}

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

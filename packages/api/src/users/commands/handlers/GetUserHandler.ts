import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUserCommand } from '../impl'
import { UserRepository } from '@au/db'

@CommandHandler(GetUserCommand)
export class GetUserHandler implements ICommandHandler<GetUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetUserCommand) {
    try {
      const user = await this.userRepository.findById(command.id)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

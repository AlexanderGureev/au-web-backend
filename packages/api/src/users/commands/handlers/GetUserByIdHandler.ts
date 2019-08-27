import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NotFoundException } from '@nestjs/common'
import { GetUserByIdCommand } from '../impl'
import { UserRepository } from '@au/db'

@CommandHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements ICommandHandler<GetUserByIdCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetUserByIdCommand) {
    try {
      const user = await this.userRepository.findById(command.id)

      if (!user) {
        throw new NotFoundException({ error: 'User not found' })
      }
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

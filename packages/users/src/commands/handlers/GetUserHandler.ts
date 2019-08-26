import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUserCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@au/entities'

@CommandHandler(GetUserCommand)
export class GetUserHandler implements ICommandHandler<GetUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: GetUserCommand) {
    try {
      const user = await this.userRepository.findOne({
        id: command.id,
      })
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GetUserByIdCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@au/entities'

@CommandHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements ICommandHandler<GetUserByIdCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: GetUserByIdCommand) {
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

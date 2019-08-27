import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForbiddenException } from '@nestjs/common'
import { LoginUserCommand } from '../impl'
import { UserRepository } from '@au/db'
import { compare } from 'bcrypt'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: LoginUserCommand) {
    const user = await this.userRepository.findUser(command.email)
    if (!user) {
      throw new ForbiddenException({ error: 'User not found' })
    }

    const isValid = await compare(command.password, user.password)
    if (!isValid) {
      throw new ForbiddenException({ error: 'Invalid credentials' })
    }
    user.lastLogonAt = new Date()
    const userData = await this.userRepository.saveUser(user)
    return userData
  }
}

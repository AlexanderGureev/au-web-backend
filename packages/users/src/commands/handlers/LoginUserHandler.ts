import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { HttpException, HttpStatus, ForbiddenException } from '@nestjs/common'
import { LoginUserCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@au/entities'
import { genSalt, compare, hash } from 'bcrypt'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: LoginUserCommand) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: command.email })
      .addSelect('user.password')
      .getOne()

    if (!user) {
      throw new ForbiddenException({ error: 'User not found' })
    }
    const isValid = await compare(command.password, user.password)
    if (!isValid) {
      throw new ForbiddenException({ error: 'Invalid credentials' })
    }
    user.lastLogonAt = new Date()
    const { password, ...userData } = await this.userRepository.save(user)
    return userData
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForbiddenException } from '@nestjs/common'
import { RegisterUserCommand } from '../impl'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, Profile, Role } from '@au/entities'
import { genSalt, hash } from 'bcrypt'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async execute(command: RegisterUserCommand) {
    try {
      const salt = await genSalt(10)

      const [hashPassword, role] = await Promise.all([
        hash(command.password, salt),
        this.roleRepository.findOne({ role: 'user' }),
      ])

      const newUser = await this.userRepository.create({
        email: command.email,
        password: hashPassword,
        registeredAt: new Date(),
        lastLogonAt: new Date(),
        role,
      })

      const profile = await this.profileRepository.create({
        avatarPath: 'ava_default.png',
        user: newUser,
      })

      const { user } = await this.profileRepository.save(profile)
      return user
    } catch (error) {
      console.log(error)
      throw new ForbiddenException({
        error: 'User with such data already exists.',
      })
    }
  }
}

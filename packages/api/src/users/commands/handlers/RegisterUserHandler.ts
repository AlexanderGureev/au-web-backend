import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ForbiddenException } from '@nestjs/common'
import { RegisterUserCommand } from '../impl'
import { UserRepository, ProfileRepository, RoleRepository } from '@au/db'
import { genSalt, hash } from 'bcrypt'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(command: RegisterUserCommand) {
    try {
      const salt = await genSalt(10)
      const [hashPassword, role] = await Promise.all([
        hash(command.password, salt),
        this.roleRepository.findRole('user'),
      ])

      const newUser = await this.userRepository.createUser({
        email: command.email,
        password: hashPassword,
        role,
      })

      const profile = await this.profileRepository.createProfile(newUser)
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

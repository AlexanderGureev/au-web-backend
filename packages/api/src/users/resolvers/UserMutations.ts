import { Args, Mutation } from '@nestjs/graphql'
import {
  RegisterUserDto,
  LoginUserDto,
  UpdateProfileDto,
  UpdateProfileByIdDto,
} from '../dto'
import { CommandBus, EventBus } from '@nestjs/cqrs'
import {
  RegisterUserCommand,
  LoginUserCommand,
  UpdateProfileCommand,
  UpdateProfileByIdCommand,
} from '../commands/impl'
import { Injectable, UseGuards } from '@nestjs/common'
import { ActionType, PossessionType } from '@au/db'
import { AuthService } from '@au/auth'
import {
  AccessGuard,
  ResourceGuard,
  ResourceAccess,
  ValidationPipe,
  CustomRes,
  CustomReq,
} from '@au/common'
import { UserRegisterEvent } from '../events/impl/UserRegister.event'

@Injectable()
export class UserMutations {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly authService: AuthService,
  ) {}

  @Mutation('register')
  async register(
    @CustomRes() res,
    @Args('input', new ValidationPipe()) input: RegisterUserDto,
  ) {
    const user = await this.commandBus.execute(
      new RegisterUserCommand(input.email, input.password),
    )
    await this.authService.createSession(res, user)

    this.eventBus.publish(new UserRegisterEvent(user.email))
    return { user }
  }

  @Mutation('login')
  async login(
    @CustomRes() res,
    @Args('input', new ValidationPipe()) input: LoginUserDto,
  ) {
    const user = await this.commandBus.execute(
      new LoginUserCommand(input.email, input.password),
    )
    await this.authService.createSession(res, user)
    return { user }
  }

  @UseGuards(AccessGuard)
  @Mutation('logout')
  async logout(@CustomReq() req, @CustomRes() res) {
    await this.authService.deleteSession(req, res)
    return true
  }

  @UseGuards(AccessGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.update, PossessionType.any)
  @Mutation('updateProfileById')
  async updateProfileById(@Args('input') input: UpdateProfileByIdDto) {
    const profile = await this.commandBus.execute(
      new UpdateProfileByIdCommand(
        input.userId,
        input.firstName,
        input.lastName,
        input.avatarPath,
      ),
    )

    return { profile }
  }

  @UseGuards(AccessGuard)
  @Mutation('updateProfile')
  async updateProfile(
    @Args('input') input: UpdateProfileDto,
    @CustomReq() req,
  ) {
    const { id } = req.credentials.user
    const profile = await this.commandBus.execute(
      new UpdateProfileCommand(
        id,
        input.firstName,
        input.lastName,
        input.avatarPath,
      ),
    )

    return { profile }
  }
}

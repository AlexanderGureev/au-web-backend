import {
  Query,
  Args,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AuthAccess,
  ResourceAccess,
  ResourceGuard,
  CurrentUser,
  AccessGuard,
} from '@au/common'

import { CommandBus } from '@nestjs/cqrs'
import {
  GetUserCommand,
  GetUsersCommand,
  GetUserByIdCommand,
} from '../commands/impl'
import { User, RoleEnums } from '@au/entities'
import { ProfileDataLoaderService } from '@au/dataloader'
const { ActionType, PossessionType } = RoleEnums

@Resolver('User')
export class UserQueries {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly profileDataLoader: ProfileDataLoaderService,
  ) {}

  @UseGuards(AccessGuard)
  @AuthAccess()
  @Query('me')
  async me(@CurrentUser() user: User) {
    const foundUser = await this.commandBus.execute(
      new GetUserCommand(user.id),
    )
    return foundUser
  }

  @UseGuards(AccessGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query('user')
  async user(@Args('id') id: number) {
    const user = await this.commandBus.execute(new GetUserByIdCommand(id))
    return user
  }

  @UseGuards(AccessGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query('users')
  async users() {
    const [users, count] = await this.commandBus.execute(new GetUsersCommand())
    return {
      rows: users,
      count,
    }
  }

  @ResolveProperty('profile')
  async profile(@Parent() user) {
    return this.profileDataLoader.load(user.id)
  }
}

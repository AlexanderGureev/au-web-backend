import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CqrsModule } from '@nestjs/cqrs'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'

import { AuthModule } from '@au/auth'
import { DataLoaderModule } from '@au/dataloader'
import { MailModule } from '@au/mail'
import {
  Role,
  User,
  Profile,
  DatabaseModule,
  UserRepository,
  ProfileRepository,
  RoleRepository,
} from '@au/db'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      ProfileRepository,
      RoleRepository,
    ]),
    DatabaseModule,
    AuthModule,
    CqrsModule,
    DataLoaderModule,
    MailModule,
  ],
  providers: [...Resolvers, ...CommandHandlers, ...EventHandlers],
})
export class UsersModule {}

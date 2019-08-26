import { RegisterUserHandler } from './RegisterUserHandler'
import { LoginUserHandler } from './LoginUserHandler'
import { GetUserHandler } from './GetUserHandler'
import { GetUsersHandler } from './GetUsersHandler'
import { UpdateProfileHandler } from './UpdateProfileHandler'
import { UpdateProfileByIdHandler } from './UpdateProfileByIdHandler'
import { GetUserByIdHandler } from './GetUserByIdHandler'
import { GetUserProfileHandler } from './GetUserProfileHandler'

export const CommandHandlers = [
  RegisterUserHandler,
  LoginUserHandler,
  GetUserHandler,
  GetUsersHandler,
  UpdateProfileHandler,
  GetUserByIdHandler,
  GetUserProfileHandler,
  UpdateProfileByIdHandler,
]

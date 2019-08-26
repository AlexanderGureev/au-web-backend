import { IsEmail, IsString, MinLength, IsAlphanumeric } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(3)
  readonly password: string
}

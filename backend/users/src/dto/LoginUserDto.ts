import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  public readonly email: string

  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string
}

import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @IsEmail()
  public readonly email: string

  @IsNotEmpty()
  public readonly password: string
}

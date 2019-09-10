import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  public readonly email: string

  @IsNotEmpty()
  public readonly password: string

  @IsNotEmpty()
  public readonly firstName: string

  @IsNotEmpty()
  public readonly lastName: string
}

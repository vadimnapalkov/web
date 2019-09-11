import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  public readonly email: string

  @IsNotEmpty()
  @MinLength(8)
  public readonly password: string

  @IsNotEmpty()
  public readonly firstName: string

  @IsNotEmpty()
  public readonly lastName: string
}

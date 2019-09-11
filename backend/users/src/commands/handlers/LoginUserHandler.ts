import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, SALT_FOR_PASSWORDS } from '@backend/gateway'
import { UserService } from '../../services'

import { LoginUserCommand } from '../impl'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: LoginUserCommand) {
    const { email, password } = command
    const user = await this.userService.findByEmail(email)
    if (!user) throw new Error('User with this email does not exist')
    const checkHash = await bcrypt.hash(password, SALT_FOR_PASSWORDS)
    if (user.password !== checkHash) throw new Error('Invalid password')

    this.userService.update(user, { lastLoginAt: new Date() })

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET)
  }
}

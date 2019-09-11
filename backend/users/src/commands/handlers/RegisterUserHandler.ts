import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, SALT_FOR_PASSWORDS } from '@backend/gateway'
import { RoleType } from '@backend/roles'

import { User } from '../../models'
import { RegisterUserCommand } from '../impl'
import { UserService } from '../../services'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly userService: UserService, private readonly publisher: EventPublisher) {}
  async execute(command: RegisterUserCommand) {
    try {
      const { email, password, firstName, lastName } = command
      const user = await this.userService.findByEmail(email)
      const role = await this.userService.findRole(RoleType.user)

      if (user) throw new Error('User with this email already exists')
      const hash = await bcrypt.hash(password, SALT_FOR_PASSWORDS)
      const newUser = {
        id: null,
        email,
        password: hash,
        profile: { firstName, lastName },
        registeredAt: new Date(),
        lastLogonAt: new Date(),
        role,
      }
      await this.userService.create(newUser)

      const userEvent = this.publisher.mergeObjectContext(new User(email))
      userEvent.registered()
      userEvent.commit()

      return { success: true, access_token: jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET) }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }
}

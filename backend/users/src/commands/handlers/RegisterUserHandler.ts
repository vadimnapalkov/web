import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs'
import { ModuleRef } from '@nestjs/core'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, SALT_FOR_PASSWORDS } from '@backend/gateway'
import { RoleType, RolesService } from '@backend/roles'

import { User } from '../../models'
import { RegisterUserCommand } from '../impl'
import { UserService } from '../../services'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  private rolesService: RolesService
  constructor(
    private readonly userService: UserService,
    private readonly publisher: EventPublisher,
    private readonly moduleRef: ModuleRef,
  ) {}
  async execute(command: RegisterUserCommand) {
    const { email, password, firstName, lastName } = command
    this.rolesService = this.moduleRef.get(RolesService, { strict: false })
    const user = await this.userService.findByEmail(email)
    const role = await this.rolesService.findRole(RoleType.user)

    if (user) throw new Error('User with this email already exists')
    const hash = await bcrypt.hash(password, SALT_FOR_PASSWORDS)
    const newUser = {
      email,
      password: hash,
      profile: { firstName, lastName },
      registeredAt: new Date(),
      lastLoginAt: new Date(),
      role,
    }
    await this.userService.create(newUser)

    const userEvent = this.publisher.mergeObjectContext(new User(email))
    userEvent.registered()
    userEvent.commit()

    return jwt.sign({ id: newUser['id'], email: newUser.email }, JWT_SECRET)
  }
}

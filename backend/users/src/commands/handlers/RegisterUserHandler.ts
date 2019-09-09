import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'

import { RegisterUserCommand } from '../impl'
import { User } from '../../entities'

const SALT_FOR_PASSWORDS = process.env.SALT_FOR_PASSWORDS || '$2b$12$DXs0ONutZe3g/q1307ViPO'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(command: RegisterUserCommand) {
    const { email, password, firstName, lastName } = command
    const user = await this.userRepository.findOne({ email })
    if (user) return false
    const hash = await bcrypt.hash(password, SALT_FOR_PASSWORDS)
    const newUser = { email, password: hash, profile: { firstName, lastName } }
    await this.userRepository.save(newUser)

    return true
  }
}

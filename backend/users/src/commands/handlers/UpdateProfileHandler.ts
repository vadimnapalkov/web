import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserService } from '../../services'

import { UpdateProfileCommand } from '../impl'

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: UpdateProfileCommand) {
    const { id, firstName, lastName } = command
    const user = await this.userService.findById(id)

    await this.userService.update(user, { profile: { firstName, lastName } })
  }
}

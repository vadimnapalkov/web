import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserService } from '../../services'

import { UpdateProfileCommand } from '../impl'

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {
  constructor(private readonly userService: UserService) {}

  async execute(command: UpdateProfileCommand) {
    try {
      const { id, firstName, lastName } = command
      const user = await this.userService.findById(id)

      this.userService.update(user, { profile: { firstName, lastName } })
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }
}
